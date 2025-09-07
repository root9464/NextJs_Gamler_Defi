'use client';

import { useAtom } from 'jotai';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SocketManager } from '../video/scene/lib/socket-manager';
import { remoteStreamsAtom } from '../video/scene/store/video';

const roomId = '125';

export default function VideoComponent() {
  const [userId] = useState(() => Math.floor(Math.random() * 10000).toString());
  const [remoteStreams, setRemoteStreams] = useAtom(remoteStreamsAtom);
  const [remoteAudioEnabled, setRemoteAudioEnabled] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const socketRef = useRef<SocketManager | null>(null);
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
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
          localVideoRef.current.playsInline = true;
          const p = localVideoRef.current.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
        }
      }
    },
    [handleRemoteTrack],
  );

  const initSocket = useCallback(() => {
    const url = `ws://127.0.0.1:6069/api/session/ws/sales_courage/${encodeURIComponent(roomId)}/${encodeURIComponent(userId)}`;
    const socket = new SocketManager(url);
    socketRef.current = socket;

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
  }, [userId]);

  const joinRoom = useCallback(async () => {
    setRemoteStreams([]);
    let localStream: MediaStream | null = null;
    try {
      localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    } catch {
      console.warn('Пользователь без камеры — подключаемся без локального потока');
    }
    await initPeerConnection(localStream);
    initSocket();
  }, [initPeerConnection, initSocket, setRemoteStreams]);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    joinRoom();

    const localVideo = localVideoRef.current;
    return () => {
      const pc = pcRef.current;
      const socket = socketRef.current;

      pc?.getSenders().forEach((s) => s.track && s.replaceTrack(null));
      pc?.close();
      socket?.disconnect();

      const tracks = (localVideo?.srcObject as MediaStream | null)?.getTracks() || [];
      tracks.forEach((t) => t.stop());
    };
  }, [joinRoom]);

  const attachStream = useCallback((videoEl: HTMLVideoElement | null, stream: MediaStream) => {
    if (!videoEl || videoEl.srcObject === stream) return;
    videoEl.srcObject = stream;
    videoEl.playsInline = true;
    videoEl.muted = true;
    const p = videoEl.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  }, []);

  const handleUnmute = useCallback(() => {
    setRemoteAudioEnabled(true);
    remoteStreams.forEach((stream) => stream.getAudioTracks().forEach((track) => (track.enabled = true)));
    document.querySelectorAll('video').forEach((video) => {
      const v = video as HTMLVideoElement;
      v.muted = false;
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    });
  }, [remoteStreams]);

  return (
    <div className='flex min-h-screen flex-col items-center bg-neutral-950 p-4 font-mono text-sm text-gray-300'>
      <h1 className='mb-4 text-lg text-gray-400'>WebRTC Video</h1>

      <div className='mb-4 flex w-full max-w-md gap-2 rounded bg-neutral-900 p-3'>
        <button className='flex-1 rounded bg-neutral-700 p-2 text-gray-200 hover:bg-neutral-600' onClick={() => joinRoom()}>
          Reconnect
        </button>
        {!remoteAudioEnabled && (
          <button className='rounded bg-neutral-700 p-2 text-gray-200 hover:bg-neutral-600' onClick={handleUnmute}>
            Unmute Remote
          </button>
        )}
      </div>

      <div className='flex w-full max-w-md flex-col gap-4'>
        <video ref={localVideoRef} autoPlay muted playsInline className='h-60 w-80 rounded bg-black' />
        {remoteStreams.map((stream) => (
          <video key={stream.id} autoPlay playsInline ref={(video) => attachStream(video, stream)} className='h-60 w-80 rounded bg-black' />
        ))}
      </div>
    </div>
  );
}
