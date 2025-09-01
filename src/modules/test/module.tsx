/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { SocketManager } from '../video/scene/lib/socket-manager';
import { WebRTCManager } from '../video/scene/lib/webrtc';
import { remoteStreamsAtom } from '../video/scene/store/video';

const roomId = '125';

export default function VideoComponent() {
  const [userId] = useState(() => Math.floor(Math.random() * 10000).toString());
  const [remoteStreams, setRemoteStreams] = useAtom(remoteStreamsAtom);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const webRtcRef = useRef<WebRTCManager | null>(null);
  const socketRef = useRef<SocketManager | null>(null);

  const initWebRTC = async () => {
    const webRtc = new WebRTCManager();
    webRtcRef.current = webRtc;

    webRtc.onTrack((stream) => {
      setRemoteStreams((prev) => (prev.some((s) => s.id === stream.id) ? prev : [...prev, stream]));
    });

    webRtc.onIceCandidate((candidate) => {
      socketRef.current?.sendMessage('candidate', JSON.stringify(candidate));
    });

    try {
      const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      webRtc.setLocalStream(localStream);
      if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
    } catch (err) {
      console.error(err);
    }
  };

  const initSocket = () => {
    const url = `ws://127.0.0.1:6069/api/session/ws/sales_courage/${encodeURIComponent(roomId)}/${encodeURIComponent(userId)}`;
    const socket = new SocketManager(url);
    socketRef.current = socket;

    socket.on('open', () => socket.sendMessage('request_offer', ''));

    socket.on('offer', async (data: string) => {
      const offer = JSON.parse(data);
      const answer = await webRtcRef.current?.handleOffer(offer);
      if (answer) socket.sendMessage('answer', JSON.stringify(answer));
    });

    socket.on('candidate', async (data: string) => {
      const candidate = JSON.parse(data);
      await webRtcRef.current?.addIceCandidate(candidate);
    });
  };

  const joinRoom = async () => {
    setRemoteStreams([]);
    await initWebRTC();
    initSocket();
  };

  useEffect(() => {
    return () => {
      webRtcRef.current?.close();
      socketRef.current?.disconnect();
      const tracks = (localVideoRef.current?.srcObject as MediaStream | null)?.getTracks() || [];
      tracks.forEach((t) => t.stop());
    };
  }, []);

  console.log(remoteStreams);

  return (
    <div className='flex min-h-screen flex-col items-center bg-neutral-950 p-4 font-mono text-sm text-gray-300'>
      <h1 className='mb-4 text-lg text-gray-400'>WebRTC Video</h1>
      <div className='mb-4 w-full max-w-md rounded bg-neutral-900 p-3'>
        <button className='w-full rounded bg-neutral-700 p-2 text-gray-200 hover:bg-neutral-600' onClick={joinRoom}>
          Join Room
        </button>
      </div>
      <div className='flex w-full max-w-md flex-col gap-4'>
        <video ref={localVideoRef} autoPlay muted className='h-60 w-80 rounded bg-black' />
        {remoteStreams.map((stream) => (
          <video
            key={stream.id}
            autoPlay
            ref={(video) => {
              if (video) video.srcObject = stream;
            }}
            className='h-60 w-80 rounded bg-black'
          />
        ))}
      </div>
    </div>
  );
}
