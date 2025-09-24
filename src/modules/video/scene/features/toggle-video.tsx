'use client';

import VideoIcon from '@/assets/svg/video.svg';
import { IconFlow } from '../flow/icon-flow';
import { useMediaContext } from '../providers/media';

export const ToggleVideo = () => {
  const { toggleVideo } = useMediaContext();
  const handleToggleVideo = () => toggleVideo().catch(() => {});
  return (
    <IconFlow className='bg-white' as='button' onClick={handleToggleVideo}>
      <VideoIcon className='h-full w-full fill-black' />
    </IconFlow>
  );
};
