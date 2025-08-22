import { useCallback, useRef, useState } from 'react';

export const useUserMedia = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startStream = useCallback(async () => {
    if (streamRef.current) return;

    try {
      console.log('[useUserMedia] Запрашиваю доступ к медиа...');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      console.log('[useUserMedia] Доступ получен.');
      streamRef.current = stream;
      setMediaStream(stream);
    } catch {
      console.log('[Warn] ошибка получения доступа к медиа ( возможно разрешение не получено )');
    }
  }, []);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      console.log('[useUserMedia] Останавливаю поток.');
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setMediaStream(null);
    }
  }, []);

  return { mediaStream, startStream, stopStream };
};
