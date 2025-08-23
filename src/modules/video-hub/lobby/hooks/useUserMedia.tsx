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

    // Сохраняем ссылку на текущий промис до начала асинхронных операций
    const currentStartingPromise = startingRef.current;

    if (stream) {
      console.log('Медиапоток уже активен');
      return stream;
    }

    if (currentStartingPromise) {
      console.log('Получение медиапотока уже в процессе');
      return currentStartingPromise;
    }

    console.log('Запрос медиапотока с constraints:', constraints);

    const p = navigator.mediaDevices
      .getUserMedia(constraints)
      .then((s) => {
        // Проверяем, не был ли запрос отменен в процессе
        if (startingRef.current === p) {
          console.log('Медиапоток получен успешно');
          setStream(s);
          startingRef.current = null;
        } else {
          console.log('Полученный поток был отменен, останавливаем треки');
          s.getTracks().forEach((track) => track.stop());
        }
        return s;
      })
      .catch((e: unknown) => {
        if (startingRef.current === p) {
          const errorMessage = (e as Error)?.message || 'Ошибка получения медиа';
          console.error('Ошибка:', errorMessage);
          setError(errorMessage);
          startingRef.current = null;
        }
        throw e;
      });

    startingRef.current = p;
    return p;
  }, [constraints, isSupported, stream]);

  const stop = useCallback(() => {
    console.log('Остановка медиапотока');

    // Сбрасываем промис запроса
    startingRef.current = null;

    if (stream) {
      const tracks = stream.getTracks();
      console.log(`Останавливаем ${tracks.length} треков`);

      tracks.forEach((track) => {
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
    const track = stream?.getAudioTracks()[0];
    if (!track) {
      console.log('Аудио трек не найден');
      return false;
    }

    const newState = !track.enabled;
    track.enabled = newState;
    console.log(`Аудио ${newState ? 'включено' : 'выключено'}`);
    return newState;
  }, [stream]);

  const toggleVideo = useCallback(() => {
    const track = stream?.getVideoTracks()[0];
    if (!track) {
      console.log('Видео трек не найден');
      return false;
    }

    const newState = !track.enabled;
    track.enabled = newState;
    console.log(`Видео ${newState ? 'включено' : 'выключено'}`);
    return newState;
  }, [stream]);

  const audioEnabled = useMemo(() => {
    return stream?.getAudioTracks().every((t) => t.enabled) ?? false;
  }, [stream]);

  const videoEnabled = useMemo(() => {
    return stream?.getVideoTracks().every((t) => t.enabled) ?? false;
  }, [stream]);

  console.log('Текущее состояние:', {
    stream: stream ? 'активен' : 'не активен',
    audioEnabled,
    videoEnabled,
    error,
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
