'use client';
import { useCallback, useState } from 'react';

type UseUserMediaOptions = {
  videoConstraints?: MediaTrackConstraints | boolean;
  audioConstraints?: MediaTrackConstraints | boolean;
};

type MediaState = {
  stream: MediaStream | null;
  videoTrack: MediaStreamTrack | null;
  audioTrack: MediaStreamTrack | null;
  error: Error | null;
};

export const useMedia = (options: UseUserMediaOptions = {}) => {
  const { videoConstraints = true, audioConstraints = true } = options;

  const [mediaState, setMediaState] = useState<MediaState>({
    stream: null,
    videoTrack: null,
    audioTrack: null,
    error: null,
  });

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
      setMediaState((prev) => ({ ...prev, error }));
      throw error;
    }

    if (mediaState.stream) {
      console.log('[useUserMedia] Stream already exists');
      return mediaState.stream;
    }

    try {
      const constraints = { video: videoConstraints, audio: audioConstraints };
      console.log('[useUserMedia] Requesting media with constraints:', constraints);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      const videoTrack = stream.getVideoTracks()[0] || null;
      const audioTrack = stream.getAudioTracks()[0] || null;

      setMediaState({ stream, videoTrack, audioTrack, error: null });
      console.log('[useUserMedia] Media stream obtained successfully');
      return stream;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      console.error('[useUserMedia] Error in start():', error);
      setMediaState((prev) => ({ ...prev, error }));
      throw error;
    }
  }, [isSupported, audioConstraints, videoConstraints, mediaState.stream]);

  const stop = useCallback(() => {
    console.log('[useUserMedia] stop called');
    stopTrack(mediaState.videoTrack);
    stopTrack(mediaState.audioTrack);
    setMediaState({ stream: null, videoTrack: null, audioTrack: null, error: null });
  }, [mediaState.videoTrack, mediaState.audioTrack]);

  const toggleVideo = useCallback(async () => {
    console.log('[useUserMedia] toggleVideo called');
    if (mediaState.videoTrack) {
      stopTrack(mediaState.videoTrack);
      const newStream = mediaState.audioTrack ? new MediaStream([mediaState.audioTrack]) : null;
      setMediaState({ stream: newStream, videoTrack: null, audioTrack: mediaState.audioTrack, error: null });
      console.log('[useUserMedia] Video turned OFF');
    } else {
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints });
        const newVideoTrack = videoStream.getVideoTracks()[0];
        if (!newVideoTrack) throw new Error('Failed to get new video track.');

        const tracks = mediaState.audioTrack ? [mediaState.audioTrack, newVideoTrack] : [newVideoTrack];
        const newStream = new MediaStream(tracks);
        setMediaState({ stream: newStream, videoTrack: newVideoTrack, audioTrack: mediaState.audioTrack, error: null });
        console.log(`[useUserMedia] Video turned ON, new track: ${newVideoTrack.id}`);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An unknown error occurred');
        console.error('[useUserMedia] Error toggling video:', error);
        setMediaState((prev) => ({ ...prev, error }));
      }
    }
  }, [mediaState, videoConstraints]);

  const toggleAudio = useCallback(async () => {
    console.log('[useUserMedia] toggleAudio called');
    if (mediaState.audioTrack) {
      stopTrack(mediaState.audioTrack);
      const newStream = mediaState.videoTrack ? new MediaStream([mediaState.videoTrack]) : null;
      setMediaState({ stream: newStream, videoTrack: mediaState.videoTrack, audioTrack: null, error: null });
      console.log('[useUserMedia] Audio turned OFF');
    } else {
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: audioConstraints });
        const newAudioTrack = audioStream.getAudioTracks()[0];
        if (!newAudioTrack) throw new Error('Failed to get new audio track.');

        const tracks = mediaState.videoTrack ? [mediaState.videoTrack, newAudioTrack] : [newAudioTrack];
        const newStream = new MediaStream(tracks);
        setMediaState({ stream: newStream, videoTrack: mediaState.videoTrack, audioTrack: newAudioTrack, error: null });
        console.log(`[useUserMedia] Audio turned ON, new track: ${newAudioTrack.id}`);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An unknown error occurred');
        console.error('[useUserMedia] Error toggling audio:', error);
        setMediaState((prev) => ({ ...prev, error }));
      }
    }
  }, [mediaState, audioConstraints]);

  return {
    ...mediaState,
    start,
    stop,
    toggleVideo,
    toggleAudio,
    isSupported,
  };
};
