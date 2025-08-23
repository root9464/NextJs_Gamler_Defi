import { useCallback, useMemo, useRef, useState } from 'react';

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
