'use client';

import MicroIcon from '@/assets/svg/micro.svg';
import { IconFlow } from '@/components/flows/icon-flow';
import { useMediaContext } from '../providers/media';

export const ToggleAudio = () => {
  const { toggleAudio } = useMediaContext();
  const handleToggleAudio = () => toggleAudio().catch(() => {});
  return (
    <IconFlow className='bg-white' as='button' onClick={handleToggleAudio}>
      <MicroIcon className='h-full w-full fill-black' />
    </IconFlow>
  );
};
