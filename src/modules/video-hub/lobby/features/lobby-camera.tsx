'use client';
import { useUserMedia } from '@/modules/video-hub/lobby/hooks/useUserMedia';
import MicroIco from '@assets/svg/micro.svg';
import VideoIco from '@assets/svg/video.svg';
import { useEffect, useRef } from 'react';

export const LobbyCamera = () => {
  const { mediaStream, startStream, stopStream } = useUserMedia();
  const videoRef = useRef<HTMLVideoElement>(null);
  const showVideo = mediaStream;

  useEffect(() => {
    startStream();
    return () => {
      stopStream();
    };
  }, [startStream, stopStream]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement && mediaStream) {
      videoElement.srcObject = mediaStream;
      const playPromise = videoElement.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error('Ошибка автовоспроизведения видео:', error);
        });
      }
    }
  }, [mediaStream]);

  return (
    <div className='relative flex h-[317px] w-full max-w-[510px] min-w-50 items-center justify-center'>
      {showVideo ? (
        <video ref={videoRef} autoPlay playsInline muted className='h-[317px] w-[510px]' />
      ) : (
        <div className='flex h-[317px] w-full max-w-[510px] min-w-50 items-center justify-center rounded-[22px] bg-[#1C1E20]'>
          <div className='flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white'>
            <p className='text-[32px] font-medium text-black'>?</p>
          </div>
        </div>
      )}
      <div className='absolute bottom-[30px] flex h-[38px] w-[94px] items-center justify-between'>
        <button className='flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full bg-[#292b2c] text-white hover:bg-[white] hover:text-blue-400'>
          <MicroIco className='fill-white hover:fill-[#1890FF]' />
        </button>
        <button className='flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full bg-[#292b2c] text-white hover:bg-[white] hover:text-blue-400'>
          <VideoIco className='fill-white hover:fill-[#1890FF]' />
        </button>
      </div>
    </div>
  );
};
