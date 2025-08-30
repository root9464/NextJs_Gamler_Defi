'use client';
import { useMedia } from '@/shared/hooks/useMedia';
import MicroIco from '@assets/svg/micro.svg';
import VideoIco from '@assets/svg/video.svg';
import { useEffect, useRef } from 'react';

export const CameraPreview = () => {
  const { stream, videoTrack, audioTrack, start, toggleAudio, toggleVideo, isSupported, error } = useMedia({
    videoConstraints: { facingMode: 'user' },
    audioConstraints: true,
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  const videoEnabled = !!videoTrack;
  const audioEnabled = !!audioTrack;

  useEffect(() => {
    if (isSupported && !stream) start().catch(console.error);
  }, [isSupported, stream, start]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) videoElement.srcObject = stream;
  }, [stream]);

  const handleToggleVideo = () => toggleVideo().catch(console.error);
  const handleToggleAudio = () => toggleAudio().catch(console.error);

  return (
    <div className='relative flex h-[317px] w-full max-w-[510px] min-w-50 items-center justify-center'>
      {videoEnabled ? (
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
          onClick={handleToggleAudio}
          aria-pressed={audioEnabled}
          title={audioEnabled ? 'Выключить микрофон' : 'Включить микрофон'}
          className='flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full bg-[#292b2c] text-white hover:bg-white hover:text-blue-400'>
          <MicroIco className={`${audioEnabled ? 'fill-white' : 'fill-[#FF4D4F]'} hover:fill-[#1890FF]`} />
        </button>
        <button
          onClick={handleToggleVideo}
          aria-pressed={videoEnabled}
          title={videoEnabled ? 'Выключить камеру' : 'Включить камеру'}
          className='flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full bg-[#292b2c] text-white hover:bg-white hover:text-blue-400'>
          <VideoIco className={`${videoEnabled ? 'fill-white' : 'fill-[#FF4D4F]'} hover:fill-[#1890FF]`} />
        </button>
      </div>
    </div>
  );
};
