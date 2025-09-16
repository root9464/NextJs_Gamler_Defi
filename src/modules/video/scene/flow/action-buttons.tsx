import MenuHubIcon from '@/assets/svg/menuhub.svg';
import MicroIcon from '@/assets/svg/micro.svg';
import VideoIcon from '@/assets/svg/video.svg';
import { IssuingCards } from '@/modules/games/curash/flows/issuing-card';
import type { FC, ReactNode } from 'react';
import { LeaveGame } from '../features/leave-game';
import { UserCards } from '../features/user-cards';
import { IconFlow } from './icon-flow';

type ActionButtonsProps = {
  adminActions?: ReactNode;
  playerActions?: ReactNode;
  isAdmin: boolean;
};

export const ActionButtons: FC<ActionButtonsProps> = ({ adminActions, playerActions, isAdmin }) => (
  <div className='flex w-full flex-row items-center justify-center gap-2.5'>
    {isAdmin && (
      <>
        <IssuingCards />
        {adminActions}
      </>
    )}
    <UserCards />
    <IconFlow className='bg-white'>
      <VideoIcon className='h-full w-full fill-black' />
    </IconFlow>
    <IconFlow className='bg-white'>
      <MicroIcon className='h-full w-full fill-black' />
    </IconFlow>

    {playerActions}

    <IconFlow className='bg-white'>
      <MenuHubIcon className='h-full w-full' />
    </IconFlow>
    <LeaveGame />
  </div>
);
