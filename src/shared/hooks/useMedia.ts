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
      console.log('[useUserMedia] Media stream obtained successfully');

      const videoTracks = stream.getVideoTracks();
      const audioTracks = stream.getAudioTracks();
      console.log(`[useUserMedia] Tracks found: Video=${videoTracks.length}, Audio=${audioTracks.length}`);

      setMediaState({
        stream,
        videoTrack: videoTracks[0] || null,
        audioTrack: audioTracks[0] || null,
        error: null,
      });
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
    if (!mediaState.stream) {
      console.log('[useUserMedia] No stream to stop');
      return;
    }
    mediaState.stream.getTracks().forEach((track) => {
      console.log(`[useUserMedia] Stopping track: ${track.kind} (${track.id})`);
      track.stop();
    });
    setMediaState({ stream: null, videoTrack: null, audioTrack: null, error: null });
  }, [mediaState.stream]);

  const toggleVideo = useCallback(async () => {
    console.log('[useUserMedia] toggleVideo called');
    const { videoTrack, audioTrack } = mediaState;

    if (videoTrack) {
      console.log(`[useUserMedia] Turning video OFF. Stopping track: ${videoTrack.id}`);
      videoTrack.stop();

      const newStream = new MediaStream(audioTrack ? [audioTrack] : []);
      setMediaState((prev) => ({
        ...prev,
        stream: newStream,
        videoTrack: null,
      }));
      console.log('[useUserMedia] Video turned OFF. New stream created without video track.');
    } else {
      console.log('[useUserMedia] Turning video ON. Requesting new video track.');
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints });
        const newVideoTrack = videoStream.getVideoTracks()[0];

        if (!newVideoTrack) {
          throw new Error('Failed to get new video track.');
        }
        console.log(`[useUserMedia] New video track obtained: ${newVideoTrack.id}`);

        const existingTracks = audioTrack ? [audioTrack] : [];
        const newStream = new MediaStream([...existingTracks, newVideoTrack]);

        setMediaState((prev) => ({
          ...prev,
          stream: newStream,
          videoTrack: newVideoTrack,
        }));
        console.log('[useUserMedia] Video turned ON. New stream created with added video track.');
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An unknown error occurred');
        console.error('[useUserMedia] Error getting new video track:', error);
        setMediaState((prev) => ({ ...prev, error }));
      }
    }
  }, [mediaState, videoConstraints]);

  const toggleAudio = useCallback(async () => {
    console.log('[useUserMedia] toggleAudio called');
    const { videoTrack, audioTrack } = mediaState;

    if (audioTrack) {
      console.log(`[useUserMedia] Turning audio OFF. Stopping track: ${audioTrack.id}`);
      audioTrack.stop();

      const newStream = new MediaStream(videoTrack ? [videoTrack] : []);
      setMediaState((prev) => ({
        ...prev,
        stream: newStream,
        audioTrack: null,
      }));
      console.log('[useUserMedia] Audio turned OFF. New stream created without audio track.');
    } else {
      console.log('[useUserMedia] Turning audio ON. Requesting new audio track.');
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: audioConstraints });
        const newAudioTrack = audioStream.getAudioTracks()[0];

        if (!newAudioTrack) {
          throw new Error('Failed to get new audio track.');
        }
        console.log(`[useUserMedia] New audio track obtained: ${newAudioTrack.id}`);

        const existingTracks = videoTrack ? [videoTrack] : [];
        const newStream = new MediaStream([...existingTracks, newAudioTrack]);

        setMediaState((prev) => ({
          ...prev,
          stream: newStream,
          audioTrack: newAudioTrack,
        }));
        console.log('[useUserMedia] Audio turned ON. New stream created with added audio track.');
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An unknown error occurred');
        console.error('[useUserMedia] Error getting new audio track:', error);
        setMediaState((prev) => ({ ...prev, error }));
      }
    }
  }, [mediaState, audioConstraints]);

  return {
    ...mediaState,
    start,
    stop,
    toggleAudio,
    toggleVideo,
    isSupported,
  };
};
