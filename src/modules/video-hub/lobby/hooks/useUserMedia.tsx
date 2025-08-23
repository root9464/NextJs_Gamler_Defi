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

  console.log('useUserMedia инициализирован', { isSupported });

  const start = useCallback(async () => {
    console.log('Запуск получения медиапотока');

    if (!isSupported) {
      console.error('MediaDevices API не поддерживается');
      setError('MediaDevices API не поддерживается');
      return null;
    }

    if (stream) {
      console.log('Медиапоток уже активен');
      return stream;
    }

    const currentPromise = startingRef.current;
    if (currentPromise) {
      console.log('Получение медиапотока уже в процессе');
      return currentPromise;
    }

    console.log('Запрос медиапотока с constraints:', constraints);

    const p = navigator.mediaDevices
      .getUserMedia(constraints)
      .then((s) => {
        if (startingRef.current !== p) {
          console.log('Запрос потока устарел, останавливаем полученные треки');
          s.getTracks().forEach((track) => track.stop());
          return s;
        }

        console.log('Медиапоток получен успешно');
        setStream(s);
        setError(null);
        startingRef.current = null;
        return s;
      })
      .catch((e: unknown) => {
        if (startingRef.current === p) {
          console.error('Ошибка получения медиапотока:', (e as Error)?.message || 'Ошибка получения медиа');
          setError((e as Error)?.message || 'Ошибка получения медиа');
          startingRef.current = null;
        }
        throw e;
      });

    startingRef.current = p;
    return p;
  }, [constraints, isSupported, stream]);

  const stop = useCallback(() => {
    console.log('Остановка медиапотока');
    if (stream) {
      const tracks = stream.getTracks();
      console.log(`Останавливаем ${tracks.length} треков`);

      tracks.forEach((track) => {
        console.log(`Останавливаем ${track.kind} трек`);
        track.stop();
      });

      setStream(null);
      setError(null);
      console.log('Медиапоток остановлен');
    } else {
      console.log('Нет активного медиапотока');
    }
  }, [stream]);

  const toggleAudio = useCallback(() => {
    const audioTracks = stream?.getAudioTracks();
    if (!audioTracks || audioTracks.length === 0) {
      console.log('Аудио треки не найдены');
      return false;
    }

    const newState = !audioTracks[0].enabled;
    audioTracks.forEach((track) => {
      track.enabled = newState;
    });

    console.log(`Аудио ${newState ? 'включено' : 'выключено'}`);
    return newState;
  }, [stream]);

  const toggleVideo = useCallback(() => {
    const videoTracks = stream?.getVideoTracks();
    if (!videoTracks || videoTracks.length === 0) {
      console.log('Видео треки не найдены');
      return false;
    }

    const newState = !videoTracks[0].enabled;
    videoTracks.forEach((track) => {
      track.enabled = newState;
    });

    console.log(`Видео ${newState ? 'включено' : 'выключено'}`);
    return newState;
  }, [stream]);

  const audioEnabled = useMemo(() => {
    return stream?.getAudioTracks().some((t) => t.enabled) ?? false;
  }, [stream]);

  const videoEnabled = useMemo(() => {
    return stream?.getVideoTracks().some((t) => t.enabled) ?? false;
  }, [stream]);

  console.log('Текущее состояние useUserMedia:', {
    hasStream: !!stream,
    audioEnabled,
    videoEnabled,
    hasError: !!error,
    isRequestPending: !!startingRef.current,
  });

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
