'use client';
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

  const isAdmin = players.some((player) => player.isHost && player.id === currentUserId);

  return (
    <div className='h-50 w-[333px] rounded-[11px] border-1 border-[#183410] bg-[#171918] px-3.5 py-[18px]'>
      <div className='flex flex-col gap-5'>
        <ActionButtons playerActions={topActions} adminActions={adminTopActions} isAdmin={isAdmin} />
        <UserActionsAudit />
        <div className='flex items-center justify-center gap-5'>
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
