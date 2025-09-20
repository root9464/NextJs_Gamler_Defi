'use client';
import { useCallback, useRef, useState } from 'react';

type UseUserMediaOptions = {
  videoConstraints?: MediaTrackConstraints | boolean;
  audioConstraints?: MediaTrackConstraints | boolean;
};

type MediaState = {
  stream: MediaStream | null;
  videoTrack: MediaStreamTrack | null;
  audioTrack: MediaStreamTrack | null;
  error: Error | null;
  permissionDenied: boolean;
};

export const useMedia = (options: UseUserMediaOptions = {}) => {
  const { videoConstraints = true, audioConstraints = true } = options;

  const initialState: MediaState = {
    stream: null,
    videoTrack: null,
    audioTrack: null,
    error: null,
    permissionDenied: false,
  };

  const [mediaState, _setMediaState] = useState<MediaState>(initialState);
  const mediaStateRef = useRef<MediaState>(initialState);
  const isRequestingRef = useRef(false);

  const setMediaState = (next: MediaState) => {
    mediaStateRef.current = next;
    _setMediaState(next);
  };

  const isSupported = typeof window !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;

  const stopTrack = (track: MediaStreamTrack | null) => {
    if (track) {
      console.log(`[useUserMedia] Stopping track: ${track.kind} (${track.id})`);
      track.stop();
    }
  };

  const start = useCallback(async () => {
    console.log('[useUserMedia] start called');

    if (!isSupported) {
      const error = new Error('MediaDevices API не поддерживается');
      console.error(`[useUserMedia] ${error.message}`);
      setMediaState({ ...mediaStateRef.current, error });
      throw error;
    }

    if (mediaStateRef.current.permissionDenied) {
      console.warn('[useUserMedia] Permission already denied, skipping start()');
      const error = new Error('Доступ к камере/микрофону запрещён пользователем');
      setMediaState({ ...mediaStateRef.current, error });
      throw error;
    }

    if (mediaStateRef.current.stream) {
      console.log('[useUserMedia] Stream already exists');
      return mediaStateRef.current.stream;
    }

    if (isRequestingRef.current) {
      console.log('[useUserMedia] Already requesting, skipping');
      return mediaStateRef.current.stream;
    }

    isRequestingRef.current = true;

    try {
      const constraints = { video: videoConstraints, audio: audioConstraints };
      console.log('[useUserMedia] Requesting media with constraints:', constraints);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      const videoTrack = stream.getVideoTracks()[0] || null;
      const audioTrack = stream.getAudioTracks()[0] || null;

      const nextState: MediaState = { stream, videoTrack, audioTrack, error: null, permissionDenied: false };
      setMediaState(nextState);
      console.log('[useUserMedia] Media stream obtained successfully');
      return stream;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      console.error('[useUserMedia] Error in start():', error);

      const name = (err as any)?.name || '';
      const message = (error.message || '').toLowerCase();
      const isPermissionError = name === 'NotAllowedError' || name === 'PermissionDeniedError' || /permission|denied/i.test(message);

      const nextState = { ...mediaStateRef.current, error, permissionDenied: isPermissionError };
      setMediaState(nextState);

      if (isPermissionError) {
        console.warn('[useUserMedia] Permission denied — further attempts disabled');
      }

      throw error;
    } finally {
      isRequestingRef.current = false;
    }
  }, [isSupported, audioConstraints, videoConstraints]);

  const stop = useCallback(() => {
    console.log('[useUserMedia] stop called');
    stopTrack(mediaStateRef.current.videoTrack);
    stopTrack(mediaStateRef.current.audioTrack);
    const keepPermission = mediaStateRef.current.permissionDenied;
    setMediaState({ stream: null, videoTrack: null, audioTrack: null, error: null, permissionDenied: keepPermission });
  }, []);

  const toggleVideo = useCallback(async () => {
    console.log('[useUserMedia] toggleVideo called');

    if (mediaStateRef.current.permissionDenied) {
      console.warn('[useUserMedia] Permission denied, cannot toggle video');
      const error = new Error('Доступ к камере запрещён');
      setMediaState({ ...mediaStateRef.current, error });
      return;
    }

    if (mediaStateRef.current.videoTrack) {
      stopTrack(mediaStateRef.current.videoTrack);
      const newStream = mediaStateRef.current.audioTrack ? new MediaStream([mediaStateRef.current.audioTrack]) : new MediaStream();
      setMediaState({ stream: newStream, videoTrack: null, audioTrack: mediaStateRef.current.audioTrack, error: null, permissionDenied: false });
      console.log('[useUserMedia] Video turned OFF');
    } else {
      if (isRequestingRef.current) {
        console.log('[useUserMedia] Already requesting video, skipping');
        return;
      }
      isRequestingRef.current = true;
      try {
        console.log('[useUserMedia] Requesting new video track');
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints });
        const newVideoTrack = videoStream.getVideoTracks()[0];
        if (!newVideoTrack) throw new Error('Failed to get new video track.');
        const tracks = mediaStateRef.current.audioTrack ? [mediaStateRef.current.audioTrack, newVideoTrack] : [newVideoTrack];
        const newStream = new MediaStream(tracks);
        setMediaState({
          stream: newStream,
          videoTrack: newVideoTrack,
          audioTrack: mediaStateRef.current.audioTrack,
          error: null,
          permissionDenied: false,
        });
        console.log(`[useUserMedia] Video turned ON, new track: ${newVideoTrack.id}`);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An unknown error occurred');
        console.error('[useUserMedia] Error toggling video:', error);
        const name = (err as any)?.name || '';
        const message = (error.message || '').toLowerCase();
        const isPermissionError = name === 'NotAllowedError' || name === 'PermissionDeniedError' || /permission|denied/i.test(message);
        setMediaState({ ...mediaStateRef.current, error, permissionDenied: isPermissionError });
        if (isPermissionError) console.warn('[useUserMedia] Permission denied — Video OFF');
      } finally {
        isRequestingRef.current = false;
      }
    }
  }, [videoConstraints]);

  const toggleAudio = useCallback(async () => {
    console.log('[useUserMedia] toggleAudio called');

    if (mediaStateRef.current.permissionDenied) {
      console.warn('[useUserMedia] Permission denied, cannot toggle audio');
      const error = new Error('Доступ к микрофону запрещён');
      setMediaState({ ...mediaStateRef.current, error });
      return;
    }

    if (mediaStateRef.current.audioTrack) {
      stopTrack(mediaStateRef.current.audioTrack);
      const newStream = mediaStateRef.current.videoTrack ? new MediaStream([mediaStateRef.current.videoTrack]) : new MediaStream();
      setMediaState({ stream: newStream, videoTrack: mediaStateRef.current.videoTrack, audioTrack: null, error: null, permissionDenied: false });
      console.log('[useUserMedia] Audio turned OFF');
    } else {
      if (isRequestingRef.current) {
        console.log('[useUserMedia] Already requesting audio, skipping');
        return;
      }
      isRequestingRef.current = true;
      try {
        console.log('[useUserMedia] Requesting new audio track');
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: audioConstraints });
        const newAudioTrack = audioStream.getAudioTracks()[0];
        if (!newAudioTrack) throw new Error('Failed to get new audio track.');
        const tracks = mediaStateRef.current.videoTrack ? [mediaStateRef.current.videoTrack, newAudioTrack] : [newAudioTrack];
        const newStream = new MediaStream(tracks);
        setMediaState({
          stream: newStream,
          videoTrack: mediaStateRef.current.videoTrack,
          audioTrack: newAudioTrack,
          error: null,
          permissionDenied: false,
        });
        console.log(`[useUserMedia] Audio turned ON, new track: ${newAudioTrack.id}`);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An unknown error occurred');
        console.error('[useUserMedia] Error toggling audio:', error);
        const name = (err as any)?.name || '';
        const message = (error.message || '').toLowerCase();
        const isPermissionError = name === 'NotAllowedError' || name === 'PermissionDeniedError' || /permission|denied/i.test(message);
        setMediaState({ ...mediaStateRef.current, error, permissionDenied: isPermissionError });
        if (isPermissionError) console.warn('[useUserMedia] Permission denied — Audio OFF');
      } finally {
        isRequestingRef.current = false;
      }
    }
  }, [audioConstraints]);

  return {
    ...mediaState,
    start,
    stop,
    toggleVideo,
    toggleAudio,
    isSupported,
  };
};
