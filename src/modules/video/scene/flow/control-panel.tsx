'use client';
import { cn } from '@/shared/utils/tw.utils';
import { useAtomValue } from 'jotai';
import type { FC } from 'react';
import { ChangeTimer } from '../features/change-timer';
import { UserActionsAudit } from '../features/user-actions-audit';
import { Timer } from '../slices/timer';
import { currentUserIdAtom, playersAtom } from '../store/players';
import { ActionButtons } from './action-buttons';

export type ControlPanelProps = {
  topActions?: React.ReactNode;
  adminTopActions?: React.ReactNode;

  playerActions?: React.ReactNode;
  adminGameActions?: React.ReactNode;
};

export const ControlPanel: FC<ControlPanelProps> = ({ topActions, playerActions, adminTopActions, adminGameActions }) => {
  const players = useAtomValue(playersAtom);
  const currentUserId = useAtomValue(currentUserIdAtom);
  const isAdmin = players.some((player) => player.is_host && player.id === currentUserId);
  return (
    <div
      className={cn(
        'h-50 w-[333px] rounded-[11px] bg-[#171918] px-3.5 py-[18px]',
        'max-desktop-xs:h-min max-desktop-xs:w-full max-desktop-xs:rounded-none max-desktop-xs:p-0 max-desktop-xs:bg-transparent',
      )}>
      <div className='flex flex-col gap-5'>
        <ActionButtons playerActions={topActions} adminActions={adminTopActions} isAdmin={isAdmin} />
        <UserActionsAudit />
        <div className='max-desktop-xs:hidden flex items-center justify-center gap-5'>
          {isAdmin ? (
            <>
              <ChangeTimer />
              {adminGameActions}
            </>
          ) : (
            <>
              <Timer />
              {playerActions}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
