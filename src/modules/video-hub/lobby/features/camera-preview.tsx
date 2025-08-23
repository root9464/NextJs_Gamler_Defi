'use client';
import { useUserMedia } from '@/modules/video-hub/lobby/hooks/useUserMedia';
import MicroIco from '@assets/svg/micro.svg';
import VideoIco from '@assets/svg/video.svg';
import { useEffect, useMemo, useRef } from 'react';

export const CameraPreview = () => {
  const { stream, start, stop, toggleAudio, toggleVideo, audioEnabled, videoEnabled, isSupported, error } = useUserMedia({
    constraints: { video: { facingMode: 'user' }, audio: true },
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    start();
    return () => stop();
  }, [start, stop]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (stream && videoEnabled) {
      el.srcObject = stream;
      el.muted = true;
      const p = el.play();
      if (p && typeof p.then === 'function') p.catch(() => {});
    } else {
      el.srcObject = null;
    }
  }, [stream, videoEnabled]);

  const showVideo = useMemo(() => Boolean(stream && videoEnabled), [stream, videoEnabled]);

  return (
    <div className='relative flex h-[317px] w-full max-w-[510px] min-w-50 items-center justify-center'>
      {showVideo ? (
        <video ref={videoRef} autoPlay playsInline muted className='h-[317px] w-[510px] rounded-[22px] object-cover' />
      ) : (
        <div className='flex h-[317px] w-full max-w-[510px] min-w-50 items-center justify-center rounded-[22px] bg-[#1C1E20]'>
          <div className='flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white'>
            <p className='text-[32px] font-medium text-black'>{isSupported ? (error ? '!' : '?') : '×'}</p>
          </div>
        </div>
      )}

      <div className='absolute bottom-[30px] flex h-[38px] w-[94px] items-center justify-between'>
        <button
          onClick={toggleAudio}
          aria-pressed={audioEnabled}
          title={audioEnabled ? 'Выключить микрофон' : 'Включить микрофон'}
          className='flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full bg-[#292b2c] text-white hover:bg-white hover:text-blue-400'>
          <MicroIco className={`${audioEnabled ? 'fill-white' : 'fill-[#FF4D4F]'} hover:fill-[#1890FF]`} />
        </button>
        <button
          onClick={toggleVideo}
          aria-pressed={videoEnabled}
          title={videoEnabled ? 'Выключить камеру' : 'Включить камеру'}
          className='flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full bg-[#292b2c] text-white hover:bg-white hover:text-blue-400'>
          <VideoIco className={`${videoEnabled ? 'fill-white' : 'fill-[#FF4D4F]'} hover:fill-[#1890FF]`} />
        </button>
      </div>
    </div>
  );
};
