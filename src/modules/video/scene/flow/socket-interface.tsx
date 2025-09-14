'use client';
import { useAccount } from '@/shared/hooks/api/useAccount';
import { useSetAtom } from 'jotai';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, type FC, type ReactNode } from 'react';
import { SocketManager } from '../lib/socket-manager';
import type { Player } from '../store/players';
import { currentUserIdAtom, playersAtom } from '../store/players';
import { MINIMAL_SOCKET_MANAGER, socketAtom } from '../store/socket';
import { localStreamAtom, remoteStreamsAtom } from '../store/video';

type SocketInterfaceProps = {
  sessionId: string;
  children: ReactNode;
};

export const SocketInterface: FC<SocketInterfaceProps> = ({ sessionId, children }) => {
  const { data: account, isSuccess: isAccountSuccess } = useAccount();

  const setSocket = useSetAtom(socketAtom);
  const setLocalStream = useSetAtom(localStreamAtom);
  const setRemoteStreams = useSetAtom(remoteStreamsAtom);
  const setCurrentUserId = useSetAtom(currentUserIdAtom);
  const setPlayers = useSetAtom(playersAtom);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const socketRef = useRef<SocketManager | null>(null);
  const unsubscribeCallbacks = useRef<Array<() => void>>([]);
  const trackIdToPlayerId = useRef<Map<string, string>>(new Map());
  const pendingStreams = useRef<Map<string, MediaStream>>(new Map());

  const pathname = usePathname();

  const userId = isAccountSuccess && account ? account.user_id.toString() : "0"
  const handleRemoteTrack = useCallback(
    (stream: MediaStream, trackId: string) => {
      console.log(
        `Received track: trackId=${trackId}, streamId=${stream.id}, tracks=${stream
          .getTracks()
          .map((t) => `${t.kind}:${t.id}`)
          .join(', ')}`,
      );
      setRemoteStreams((prev) => {
        if (prev.some((s) => s.id === stream.id)) return prev;
        return [...prev, stream];
      });
      const playerId = trackIdToPlayerId.current.get(trackId);
      if (playerId) {
        console.log(`Mapping stream ${stream.id} to player ${playerId}`);
        setPlayers((prev) => prev.map((p) => (p.id === playerId ? { ...p, streamId: stream.id } : p)));
      } else {
        console.log(`No playerId for trackId=${trackId}, storing in pendingStreams`);
        pendingStreams.current.set(trackId, stream);
      }
    },
    [setRemoteStreams, setPlayers],
  );

  const initPeerConnection = useCallback(
    async (localStream: MediaStream | null) => {
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });
      pcRef.current = pc;

      pc.ontrack = (e) => {
        const stream = e.streams[0] || new MediaStream([e.track]);
        console.log(`ontrack: kind=${e.track.kind}, trackId=${e.track.id}, streamId=${stream.id}`);
        if (e.track.kind === 'video') {
          handleRemoteTrack(stream, e.track.id);
        }
      };
      pc.oniceconnectionstatechange = () => {
        console.log(`ICE state: ${pc.iceConnectionState}`);
        if (pc.iceConnectionState === 'failed' || pc.iceConnectionState === 'disconnected') {
          console.log('Reconnecting due to ICE failure...');
          setTimeout(() => joinRoom(userId), 2000);
        }
      };
      pc.onicecandidate = (e) => {
        if (e.candidate) {
          console.log(`Sending ICE candidate: ${JSON.stringify(e.candidate.toJSON())}`);
          socketRef.current?.sendMessage('candidate', JSON.stringify(e.candidate.toJSON()));
        }
      };

      if (localStream) {
        localStream.getTracks().forEach((track) => {
          console.log(`Adding track: kind=${track.kind}, id=${track.id}`);
          pc.addTrack(track, localStream);
        });
        setLocalStream(localStream);
      }
    },
    [handleRemoteTrack, setLocalStream, userId],
  );

  //https://serv.gamler.online/web3/api/game/assets
  const initSocket = useCallback(
    (userId: string) => {
      const url = `https://serv.gamler.online/web3/api/session/ws/sales_courage/${encodeURIComponent(sessionId)}/${encodeURIComponent(userId)}`;
      const socket = new SocketManager(url);
      socketRef.current = socket;

      socket.on('open', () => {
        setSocket(socket);
        console.log(`WebSocket connected: userId=${userId}`);
        setCurrentUserId(userId);
        socket.sendMessage('request_offer', '');
        socket.sendMessage('participants', '');
        // Запрашиваем подписку на треки для всех участников
        socket.sendMessage('subscribe', JSON.stringify({ userIds: [] })); // Пустой массив = подписка на всех
      });

      unsubscribeCallbacks.current.push(
        socket.on('player_joined', (payload: { player: Player }) => {
          console.log(`Player joined: ${payload.player.id}`);
          setPlayers((prev) => {
            const exists = prev.some((p) => p.id === payload.player.id);
            if (!exists) return [...prev, payload.player];
            return prev;
          });
          // Подписываемся на треки нового игрока
          socket.sendMessage('subscribe', JSON.stringify({ userIds: [payload.player.id] }));
        }),
      );

      unsubscribeCallbacks.current.push(
        socket.on('player_left', (payload: { playerId: string }) => {
          console.log(`Player left: ${payload.playerId}`);
          setPlayers((prev) => prev.filter((player) => player.id !== payload.playerId));
          trackIdToPlayerId.current.forEach((pid, tid) => {
            if (pid === payload.playerId) trackIdToPlayerId.current.delete(tid);
          });
          pendingStreams.current.forEach((_, tid) => {
            if (trackIdToPlayerId.current.get(tid) === payload.playerId) {
              pendingStreams.current.delete(tid);
            }
          });
        }),
      );

      unsubscribeCallbacks.current.push(
        socket.on('full_state', (payload: { players: Player[] }) => {
          console.log('Full state received:', payload.players);
          setPlayers(payload.players);
          // Подписываемся на треки всех игроков
          const userIds = payload.players.filter((p) => p.id !== userId).map((p) => p.id);
          socket.sendMessage('subscribe', JSON.stringify({ userIds }));
        }),
      );

      unsubscribeCallbacks.current.push(
        socket.on('participants', (payload) => {
          console.log('Participants received:', payload);
          try {
            const users = JSON.parse(payload);
            users.forEach((u: { UserID: string; Username: string; StreamID?: string; TrackID?: string }) => {
              console.log(`Processing participant: UserID=${u.UserID}, TrackID=${u.TrackID}, StreamID=${u.StreamID}`);
              setPlayers((prev) =>
                prev.map((p) => (p.id === u.UserID ? { ...p, name: u.Username, streamId: u.StreamID, trackId: u.TrackID } : p)),
              );
              if (u.TrackID && u.UserID !== userId) {
                trackIdToPlayerId.current.set(u.TrackID, u.UserID);
                const pendingStream = pendingStreams.current.get(u.TrackID);
                if (pendingStream) {
                  console.log(`Found pending stream ${pendingStream.id} for player ${u.UserID}`);
                  setPlayers((prev) => prev.map((p) => (p.id === u.UserID ? { ...p, streamId: pendingStream.id } : p)));
                  pendingStreams.current.delete(u.TrackID);
                }
              }
            });
          } catch (e) {
            console.error('Error parsing participants:', e);
          }
        }),
      );

      unsubscribeCallbacks.current.push(
        socket.on('participant:updated', (payload: { UserID: string; Username: string; StreamID?: string; TrackID?: string }) => {
          console.log(`participant:updated: UserID=${payload.UserID}, TrackID=${payload.TrackID}, StreamID=${payload.StreamID}`);
          setPlayers((prev) =>
            prev.map((p) =>
              p.id === payload.UserID ? { ...p, name: payload.Username, streamId: payload.StreamID, trackId: payload.TrackID } : p,
            ),
          );
          if (payload.TrackID && payload.UserID !== userId) {
            trackIdToPlayerId.current.set(payload.TrackID, payload.UserID);
            const pendingStream = pendingStreams.current.get(payload.TrackID);
            if (pendingStream) {
              console.log(`Found pending stream ${pendingStream.id} for player ${payload.UserID}`);
              setPlayers((prev) => prev.map((p) => (p.id === payload.UserID ? { ...p, streamId: pendingStream.id } : p)));
              pendingStreams.current.delete(payload.TrackID);
            }
          }
        }),
      );

      socket.on('offer', async (data) => {
        if (!pcRef.current) return;
        console.log(`Received offer: ${data}`);
        try {
          const offer = JSON.parse(data);
          await pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await pcRef.current.createAnswer();
          await pcRef.current.setLocalDescription(answer);
          console.log(`Sending answer: ${JSON.stringify(answer)}`);
          socket.sendMessage('answer', JSON.stringify(answer));
        } catch (e) {
          console.error('Error handling offer:', e);
        }
      });

      socket.on('answer', async (data) => {
        if (!pcRef.current) return;
        console.log(`Received answer: ${data}`);
        try {
          await pcRef.current.setRemoteDescription(new RTCSessionDescription(JSON.parse(data)));
        } catch (e) {
          console.error('Error handling answer:', e);
        }
      });

      socket.on('candidate', async (data) => {
        if (!pcRef.current) return;
        console.log(`Received candidate: ${data}`);
        try {
          await pcRef.current.addIceCandidate(new RTCIceCandidate(JSON.parse(data)));
        } catch {
          console.warn('Не удалось добавить ICE-кандидата');
        }
      });
    },
    [sessionId, setCurrentUserId, setPlayers, setSocket],
  );

  const joinRoom = useCallback(
    async (userId: string) => {
      console.log(`Joining room: sessionId=${sessionId}, userId=${userId}`);
      setRemoteStreams([]);
      pendingStreams.current.clear();
      let localStream: MediaStream | null = null;

      try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        console.log(
          `Got local stream: streamId=${localStream.id}, tracks=${localStream
            .getTracks()
            .map((t) => `${t.kind}:${t.id}`)
            .join(', ')}`,
        );
      } catch (e) {
        console.warn('Пользователь без камеры — подключаемся без локального потока', e);
      }

      await initPeerConnection(localStream);
      initSocket(userId);
    },
    [initPeerConnection, initSocket, setRemoteStreams, sessionId],
  );

  const cleanup = useCallback(() => {
    console.log('Cleaning up WebSocket and PeerConnection');
    unsubscribeCallbacks.current.forEach((unsubscribe) => unsubscribe());
    unsubscribeCallbacks.current = [];
    trackIdToPlayerId.current.clear();
    pendingStreams.current.clear();

    pcRef.current?.getSenders().forEach((s) => s.track && s.replaceTrack(null));
    pcRef.current?.close();
    socketRef.current?.disconnect();
    setLocalStream((stream) => {
      stream?.getTracks().forEach((t) => t.stop());
      return null;
    });

    setRemoteStreams([]);
    setSocket(MINIMAL_SOCKET_MANAGER);
    setCurrentUserId(null);
    setPlayers([]);
  }, [setLocalStream, setRemoteStreams, setSocket, setCurrentUserId, setPlayers]);

  useEffect(() => {
    if (!account?.user_id) return;
    joinRoom(userId);
    window.addEventListener('beforeunload', cleanup);
    return () => cleanup();
  }, [account?.user_id, joinRoom, cleanup, pathname]);

  return <>{children}</>;
};
