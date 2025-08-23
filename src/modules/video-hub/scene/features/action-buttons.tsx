import CardHubIcon from '@/assets/svg/cardhub.svg';
import ExitIcon from '@/assets/svg/exit.svg';
import MenuHubIcon from '@/assets/svg/menuhub.svg';
import MicroIcon from '@/assets/svg/micro.svg';
import VideoIcon from '@/assets/svg/video.svg';
import type { FC, ReactNode } from 'react';

type ActionButtonsProps = {
  adminActions: ReactNode;
  additionalActions: ReactNode;
};

export const ActionButtons: FC<Partial<ActionButtonsProps>> = ({ adminActions, additionalActions }) => (
  <div className='flex w-full flex-row items-center justify-center gap-2.5'>
    <div className='flex h-9 w-[26px] cursor-pointer items-center justify-center rounded-[3px] bg-linear-to-r from-[#BDC3C7] to-[#FFFFFF]'>
      <CardHubIcon />
    </div>
    {adminActions}
    <div className='flex size-[35px] cursor-pointer items-center justify-center rounded-full bg-white'>
      <VideoIcon className='fill-black' />
    </div>
    <div className='flex size-[35px] cursor-pointer items-center justify-center rounded-full bg-white'>
      <MicroIcon className='fill-black' />
    </div>
    {additionalActions}
    <div className='flex size-[35px] cursor-pointer items-center justify-center rounded-full bg-white'>
      <MenuHubIcon />
    </div>
    <div className='flex size-[35px] cursor-pointer items-center justify-center rounded-[40px] bg-[#FF4343]'>
      <ExitIcon />
    </div>
  </div>
);
