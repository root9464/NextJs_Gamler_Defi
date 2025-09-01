'use client';
import { useAccount } from '@/shared/hooks/api/useAccount';
import { useSetAtom } from 'jotai';
import { useCallback, useEffect, useRef, type FC, type ReactNode } from 'react';
import { SocketManager } from '../lib/socket-manager';
import { MINIMAL_SOCKET_MANAGER, socketAtom } from '../store/socket';
import { localStreamAtom, remoteStreamsAtom } from '../store/video';

type SocketInterfaceProps = {
  sessionId: string;
  children: Readonly<ReactNode>;
};

export const SocketInterface: FC<SocketInterfaceProps> = ({ sessionId, children }) => {
  const { data: account } = useAccount();
  const setSocket = useSetAtom(socketAtom);
  const setLocalStream = useSetAtom(localStreamAtom);
  const setRemoteStreams = useSetAtom(remoteStreamsAtom);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const mountedRef = useRef(false);

  const handleRemoteTrack = useCallback(
    (stream: MediaStream) => {
      setRemoteStreams((prev) => (prev.some((s) => s.id === stream.id) ? prev : [...prev, stream]));
    },
    [setRemoteStreams],
  );

  const initPeerConnection = useCallback(
    async (localStream: MediaStream | null) => {
      const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
      pcRef.current = pc;

      pc.ontrack = (event) => {
        const stream = event.streams[0] || new MediaStream([event.track]);
        handleRemoteTrack(stream);
      };

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current?.sendMessage('candidate', JSON.stringify(event.candidate.toJSON()));
        }
      };

      if (localStream) {
        localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
        setLocalStream(localStream);
      }
    },
    [handleRemoteTrack, setLocalStream],
  );

  const socketRef = useRef<SocketManager | null>(null);

  const initSocket = useCallback(
    (userId: string) => {
      const url = `ws://127.0.0.1:6069/api/session/ws/sales_courage/${encodeURIComponent(sessionId)}/${encodeURIComponent(userId)}`;
      const socket = new SocketManager(url);
      socketRef.current = socket;
      setSocket(socket);

      socket.on('open', () => socket.sendMessage('request_offer', ''));

      socket.on('offer', async (data: string) => {
        const offer = JSON.parse(data);
        if (!pcRef.current) return;

        await pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pcRef.current.createAnswer();
        await pcRef.current.setLocalDescription(answer);
        socket.sendMessage('answer', JSON.stringify(answer));
      });

      socket.on('answer', async (data: string) => {
        if (!pcRef.current) return;
        const answer = JSON.parse(data);
        await pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
      });

      socket.on('candidate', async (data: string) => {
        if (!pcRef.current) return;
        try {
          const candidate = JSON.parse(data);
          await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        } catch {
          console.warn('Не удалось добавить ICE-кандидата');
        }
      });
    },
    [sessionId, setSocket],
  );

  const joinRoom = useCallback(
    async (userId: string) => {
      setRemoteStreams([]);
      let localStream: MediaStream | null = null;

      try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      } catch {
        console.warn('Пользователь без камеры — подключаемся без локального потока');
      }

      await initPeerConnection(localStream);
      initSocket(userId);
    },
    [initPeerConnection, initSocket, setRemoteStreams],
  );

  useEffect(() => {
    if (!account?.user_id || mountedRef.current) return;
    mountedRef.current = true;
    joinRoom(account.user_id.toString());

    return () => {
      const pc = pcRef.current;
      const socket = socketRef.current;

      pc?.getSenders().forEach((s) => s.track && s.replaceTrack(null));
      pc?.close();
      socket?.disconnect();

      setLocalStream(null);
      setRemoteStreams([]);
      setSocket(MINIMAL_SOCKET_MANAGER);
    };
  }, [account?.user_id, joinRoom, setLocalStream, setRemoteStreams, setSocket]);

  return <>{children}</>;
};
