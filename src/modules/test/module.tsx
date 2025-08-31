'use client';

import { useEffect, useRef, useState } from 'react';

export default function VideoComponent() {
  const [roomId, setRoomId] = useState('125');
  const [logs, setLogs] = useState<string[]>([]);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideosRef = useRef<HTMLDivElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const log = (message: string, type: 'info' | 'error' | 'success' = 'info') => {
    console.log(message);
    const timestamp = new Date().toLocaleTimeString();
    const coloredMessage = `[${timestamp}] ${message}`;
    setLogs((prev) => [coloredMessage, ...prev]);
  };

  const initPeerConnection = () => {
    if (pcRef.current) {
      pcRef.current.close();
      log('Closed previous PeerConnection');
    }

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    pc.ontrack = (event) => {
      if (event.track.kind === 'audio') return;
      log(`Received ${event.track.kind} track`, 'success');

      const stream = event.streams[0];
      const container = document.createElement('div');
      container.className = 'remote-video-container';

      const video = document.createElement('video');
      video.srcObject = stream;
      video.autoplay = true;
      video.controls = true;
      video.width = 320;
      video.height = 240;
      video.className = 'bg-black rounded';

      const label = document.createElement('div');
      label.className = 'text-gray-400 text-sm';
      label.textContent = `Participant ${remoteVideosRef.current?.childElementCount || 0 + 1}`;

      container.appendChild(label);
      container.appendChild(video);
      remoteVideosRef.current?.appendChild(container);

      event.track.onmute = () => video.play();

      stream.onremovetrack = () => {
        container.remove();
        log('Removed remote video track');
      };
    };

    pc.oniceconnectionstatechange = () => {
      log(`ICE state: ${pc.iceConnectionState}`);
      if (pc.iceConnectionState === 'failed' || pc.iceConnectionState === 'disconnected') {
        log('Connection lost, reconnecting...', 'error');
        setTimeout(initConnection, 2000);
      }
    };

    pc.onsignalingstatechange = () => {
      log(`Signaling state: ${pc.signalingState}`);
    };

    pc.onicecandidate = (event) => {
      if (event.candidate && wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            event: 'candidate',
            data: JSON.stringify(event.candidate),
          }),
        );
        log('Sent ICE candidate', 'success');
      }
    };

    pcRef.current = pc;
    return pc;
  };

  const setupWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
      log('Closed previous WebSocket');
    }

    const ws = new WebSocket(`ws://127.0.0.1:6069/api/session/ws/sales_courage/${encodeURIComponent(roomId)}/6`);

    ws.onopen = () => {
      log(`WebSocket connected: ${roomId}`, 'success');
      ws.send(
        JSON.stringify({
          event: 'request_offer',
          data: '',
        }),
      );
      log('Requested offer from server', 'success');
    };

    ws.onclose = () => {
      log('WebSocket closed, reconnecting...', 'error');
      setTimeout(initConnection, 2000);
    };

    ws.onerror = (event) => {
      log(`WebSocket error: ${event}`, 'error');
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);

        switch (msg.event) {
          case 'offer':
            const offer = JSON.parse(msg.data);
            log(`Received offer, signaling state: ${pcRef.current?.signalingState}`);

            pcRef.current
              ?.setRemoteDescription(new RTCSessionDescription(offer))
              .then(() => {
                log('Set remote description (offer)', 'success');
                return pcRef.current?.createAnswer();
              })
              .then((answer) => {
                log('Created answer', 'success');
                return pcRef.current?.setLocalDescription(answer);
              })
              .then(() => {
                if (wsRef.current?.readyState === WebSocket.OPEN) {
                  wsRef.current.send(
                    JSON.stringify({
                      event: 'answer',
                      data: JSON.stringify(pcRef.current?.localDescription),
                    }),
                  );
                  log('Sent answer to server', 'success');
                }
              })
              .catch((error) => log(`Offer processing error: ${error}`, 'error'));
            break;

          case 'candidate':
            const candidate = JSON.parse(msg.data);
            pcRef.current
              ?.addIceCandidate(new RTCIceCandidate(candidate))
              .then(() => log('Added ICE candidate', 'success'))
              .catch((error) => log(`ICE candidate error: ${error}`, 'error'));
            break;
        }
      } catch (e) {
        log(`Parse error: ${e}`, 'error');
      }
    };

    wsRef.current = ws;
    return ws;
  };

  const initConnection = async () => {
    if (remoteVideosRef.current) {
      remoteVideosRef.current.innerHTML = '';
    }
    log(`Connecting to room: ${roomId}`);

    initPeerConnection();
    setupWebSocket();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      stream.getTracks().forEach((track) => {
        pcRef.current?.addTrack(track, stream);
        log(`Added ${track.kind} track`, 'success');
      });
    } catch (error) {
      log(`Media error: ${error}`, 'error');
      log('Camera/mic unavailable', 'error');
    }
  };

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      log(`Joining room: ${roomId}`, 'success');
      initConnection();
    } else {
      log('Enter a room ID', 'error');
    }
  };

  useEffect(() => {
    return () => {
      pcRef.current?.close();
      wsRef.current?.close();
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className='flex min-h-screen flex-col items-center bg-neutral-950 p-4 font-mono text-sm text-gray-300'>
      <h1 className='mb-4 text-lg text-gray-400'>WebRTC Video</h1>

      <div className='mb-4 w-full max-w-md rounded bg-neutral-900 p-3'>
        <input
          type='text'
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder='Room ID'
          className='w-full rounded border border-neutral-700 bg-neutral-800 p-2 text-gray-300 focus:border-gray-500 focus:outline-none'
        />
        <button onClick={handleJoinRoom} className='mt-2 w-full rounded bg-neutral-700 p-2 text-gray-200 transition hover:bg-neutral-600'>
          Join
        </button>
      </div>

      <div className='flex w-full max-w-md flex-col gap-4'>
        <div>
          <h3 className='text-sm text-gray-400'>Local</h3>
          <video ref={localVideoRef} width={320} height={240} autoPlay muted className='rounded bg-black' />
        </div>
        <div>
          <h3 className='text-sm text-gray-400'>Remote</h3>
          <div ref={remoteVideosRef} />
        </div>
      </div>

      <div className='mt-4 w-full max-w-md'>
        <h3 className='text-sm text-gray-400'>Logs</h3>
        <div className='max-h-40 overflow-y-auto rounded bg-neutral-900 p-2'>
          {logs.map((log, index) => (
            <div key={index} className='text-gray-400'>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
