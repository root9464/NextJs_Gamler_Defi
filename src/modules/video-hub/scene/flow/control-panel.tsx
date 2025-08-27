import type { FC, ReactNode } from 'react';
import { ActionButtons } from './action-buttons';
import { ChangeTimer } from '../features/change-timer';
import { UserActions } from '../features/user-actions';
import { Timer } from '../slices/timer';

export type ControlPanelProps = {
  adminActions: ReactNode;
  additionalActions: ReactNode;

  adminPanelActions: ReactNode;
  panelActions: ReactNode;
  isAdmin: boolean;
};

export const ControlPanel: FC<Partial<ControlPanelProps>> = ({ adminActions, additionalActions, adminPanelActions, panelActions, isAdmin }) => {
  return (
    <div className='h-50 w-[333px] rounded-[11px] border-1 border-[#183410] bg-[#171918] px-3.5 py-[18px]'>
      <div className='flex flex-col gap-5'>
        <ActionButtons adminActions={adminActions} additionalActions={additionalActions} isAdmin={isAdmin} />
        <UserActions />
        <div className='flex items-center justify-center gap-5'>
          {isAdmin ? <ChangeTimer /> : <Timer />}
          {panelActions}
          {isAdmin && adminPanelActions}
        </div>
      </div>
    </div>
  );
};
