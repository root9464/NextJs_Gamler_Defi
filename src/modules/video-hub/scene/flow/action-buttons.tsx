import ExitIcon from '@/assets/svg/exit.svg';
import MenuHubIcon from '@/assets/svg/menuhub.svg';
import MicroIcon from '@/assets/svg/micro.svg';
import VideoIcon from '@/assets/svg/video.svg';
import type { FC, ReactNode } from 'react';
import { GiveUserCard } from '../features/give-user-card';

type ActionButtonsProps = {
  adminActions: ReactNode;
  additionalActions: ReactNode;
  isAdmin: boolean;
};

export const ActionButtons: FC<Partial<ActionButtonsProps>> = ({ adminActions, additionalActions, isAdmin }) => (
  <div className='flex w-full flex-row items-center justify-center gap-2.5'>
    {isAdmin && (
      <>
        <GiveUserCard />
        {adminActions}
      </>
    )}
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
