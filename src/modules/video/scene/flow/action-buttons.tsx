import MenuHubIcon from '@/assets/svg/menuhub.svg';
import { IconFlow } from '@/components/flows/icon-flow';
import { IssuingCards } from '@/modules/games/curash/flows/issuing-card';
import type { FC, ReactNode } from 'react';
import { LeaveGame } from '../features/leave-game';
import { ToggleAudio } from '../features/toggle-audio';
import { ToggleVideo } from '../features/toggle-video';
import { UserCards } from '../features/user-cards';

type ActionButtonsProps = {
  adminActions?: ReactNode;
  playerActions?: ReactNode;
  isAdmin: boolean;
};

export const ActionButtons: FC<ActionButtonsProps> = ({ adminActions, playerActions, isAdmin }) => (
  <div className='flex w-full flex-row items-center justify-center gap-2.5'>
    {isAdmin && (
      <>
        <IssuingCards className='max-desktop-xs:hidden' />
        {adminActions}
      </>
    )}
    <UserCards />
    <ToggleAudio />
    <ToggleVideo />

    {playerActions}

    <IconFlow className='bg-white'>
      <MenuHubIcon className='h-full w-full' />
    </IconFlow>
    <LeaveGame />
  </div>
);
