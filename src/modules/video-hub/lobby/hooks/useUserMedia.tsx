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

import { useMemo } from 'react';

type UseUserMediaOptions = {
  constraints?: MediaStreamConstraints;
};

export const useUserMedia = (options: UseUserMediaOptions = {}) => {
  const { constraints = { video: { facingMode: 'user' }, audio: true } } = options;

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startingRef = useRef<Promise<MediaStream> | null>(null);

  const isSupported = typeof window !== 'undefined' && typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;

  const start = useCallback(async () => {
    if (!isSupported) {
      setError('MediaDevices API не поддерживается');
      return null;
    }
    if (stream) return stream;
    if (startingRef.current) return startingRef.current;

    const p = navigator.mediaDevices
      .getUserMedia(constraints)
      .then((s) => {
        setStream(s);
        startingRef.current = null;
        return s;
      })
      .catch((e: unknown) => {
        setError((e as Error)?.message || 'Ошибка getUserMedia');
        startingRef.current = null;
        throw e;
      });

    startingRef.current = p;
    return p;
  }, [constraints, isSupported, stream]);

  const stop = useCallback(() => {
    if (!stream) return;
    stream.getTracks().forEach((t) => t.stop());
    setStream(null);
  }, [stream]);

  const toggleAudio = useCallback(() => {
    const track = stream?.getAudioTracks()[0];
    if (!track) return false;
    track.enabled = !track.enabled;
    return track.enabled;
  }, [stream]);

  const toggleVideo = useCallback(() => {
    const track = stream?.getVideoTracks()[0];
    if (!track) return false;
    track.enabled = !track.enabled;
    return track.enabled;
  }, [stream]);

  const audioEnabled = useMemo(() => stream?.getAudioTracks().every((t) => t.enabled) ?? false, [stream]);

  const videoEnabled = useMemo(() => stream?.getVideoTracks().every((t) => t.enabled) ?? false, [stream]);

  return {
    stream,
    start,
    stop,
    toggleAudio,
    toggleVideo,
    audioEnabled,
    videoEnabled,
    isSupported,
    error,
  };
};
