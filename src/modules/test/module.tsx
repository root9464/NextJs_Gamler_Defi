'use client';

import { useEffect, useRef, useState } from 'react';
import { SocketManager } from '../video/scene/lib/socket-manager';
import { WebRTCManager } from '../video/scene/lib/webrtc';

interface Offer {
  type: 'offer';
  sdp: string;
}

export default function VideoComponent() {
  const [roomId, setRoomId] = useState<string>('125');
  const [userId, setUserId] = useState<string>('6');
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const socketRef = useRef<SocketManager | null>(null);
  const webRtcRef = useRef<WebRTCManager | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const initializeWebRTC = () => {
    const webRtc = new WebRTCManager();
    webRtcRef.current = webRtc;
    webRtc.init();
    webRtc.onTrack((stream: MediaStream) => setRemoteStreams((prev) => (prev.some((s) => s.id === stream.id) ? prev : [...prev, stream])));
    webRtc.onIceCandidate((candidate) => {
      socketRef.current?.sendMessage('candidate', JSON.stringify(candidate));
    });
  };

  const initializeSocket = () => {
    const url = `ws://127.0.0.1:6069/api/session/ws/sales_courage/${encodeURIComponent(roomId)}/${encodeURIComponent(userId)}`;
    const socket = new SocketManager(url);
    socketRef.current = socket;
    socket.on('open', () => socket.sendMessage('request_offer', ''));
    socket.on('offer', async (data: string) => {
      try {
        const offer: Offer = JSON.parse(data);
        const answer = await webRtcRef.current?.handleOffer(offer);
        if (answer) {
          socket.sendMessage('answer', JSON.stringify(answer));
        }
      } catch (error) {
        console.error('Failed to handle offer:', error);
      }
    });
    socket.on('candidate', (data: string) => {
      try {
        const candidate: RTCIceCandidateInit = JSON.parse(data);
        webRtcRef.current?.addIceCandidate(candidate);
      } catch (error) {
        console.error('Failed to handle ICE candidate:', error);
      }
    });
  };

  const initializeLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      webRtcRef.current?.setLocalStream(stream);
    } catch (error) {
      console.error('Failed to initialize local stream:', error);
    }
  };

  const initConnection = async () => {
    setRemoteStreams([]);
    initializeWebRTC();
    initializeSocket();
    await initializeLocalStream();
  };

  const handleJoinRoom = () => {
    if (!roomId.trim() || !userId.trim()) {
      console.error('Room ID and User ID must not be empty');
      return;
    }
    initConnection();
  };

  useEffect(() => {
    return () => {
      webRtcRef.current?.close();
      socketRef.current?.disconnect();
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className='flex min-h-screen flex-col items-center bg-neutral-950 p-4 font-mono text-sm text-gray-300'>
      <h1 className='mb-4 text-lg text-gray-400'>WebRTC Video</h1>
      <div className='mb-4 w-full max-w-md rounded bg-neutral-900 p-3'>
        <div className='mb-2'>
          <input
            type='text'
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className='w-full rounded border border-neutral-700 bg-neutral-800 p-2 text-gray-300 focus:border-gray-500 focus:outline-none'
            placeholder='Room ID'
          />
        </div>
        <div className='mb-2'>
          <input
            type='text'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className='w-full rounded border border-neutral-700 bg-neutral-800 p-2 text-gray-300 focus:border-gray-500 focus:outline-none'
            placeholder='User ID'
          />
        </div>
        <button onClick={handleJoinRoom} className='w-full rounded bg-neutral-700 p-2 text-gray-200 transition hover:bg-neutral-600'>
          Join Room
        </button>
      </div>
      <div className='flex w-full max-w-md flex-col gap-4'>
        <div>
          <video ref={localVideoRef} width={320} height={240} autoPlay muted className='rounded bg-black' />
        </div>
        <div className='flex flex-col gap-2'>
          {remoteStreams.map((stream) => (
            <video
              key={stream.id}
              ref={(video) => {
                if (video) video.srcObject = stream;
              }}
              autoPlay
              className='h-60 w-80 rounded bg-black'
            />
          ))}
        </div>
      </div>
    </div>
  );
}
