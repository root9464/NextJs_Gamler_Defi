import MenuHubIcon from '@/assets/svg/menuhub.svg';
import MicroIcon from '@/assets/svg/micro.svg';
import VideoIcon from '@/assets/svg/video.svg';
import type { FC, ReactNode } from 'react';
import { GiveUserCard } from '../features/give-user-card';
import { LeaveGame } from '../features/leave-game';

type ActionButtonsProps = {
  adminActions?: ReactNode;
  playerActions?: ReactNode;
  isAdmin: boolean;
};

export const ActionButtons: FC<ActionButtonsProps> = ({ adminActions, playerActions, isAdmin }) => (
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

    {playerActions}

    <div className='flex size-[35px] cursor-pointer items-center justify-center rounded-full bg-white'>
      <MenuHubIcon />
    </div>
    <LeaveGame />
  </div>
);
