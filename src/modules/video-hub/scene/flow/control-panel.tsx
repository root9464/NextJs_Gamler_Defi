import DiceIcon from '@/assets/svg/dice.svg';
import type { FC, ReactNode } from 'react';
import { ActionButtons } from '../features/action-buttons';
import { DiceSettings } from '../features/dice-settings';
import { Timer } from '../features/timer';
import { UserActions } from '../features/user-actions';

export type ControlPanelProps = {
  adminActions: ReactNode;
  additionalActions: ReactNode;
  isAdmin: boolean;
};

export const ControlPanel: FC<Partial<ControlPanelProps>> = ({ adminActions, additionalActions, isAdmin }) => {
  return (
    <div className='h-50 w-[333px] rounded-[11px] border-1 border-[#183410] bg-[#171918] px-3.5 py-[18px]'>
      <div className='flex flex-col gap-5'>
        <ActionButtons adminActions={adminActions} additionalActions={additionalActions} />
        <UserActions />
        <div className='flex items-center justify-center gap-5'>
          <Timer />
          <DiceIcon className='h-[43px] w-[37px] cursor-pointer' />
          {isAdmin && <DiceSettings />}
        </div>
      </div>
    </div>
  );
};
