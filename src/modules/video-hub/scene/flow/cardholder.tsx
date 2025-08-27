import PlusIcon from '@/assets/svg/plus.svg';
import type { FC, ReactNode } from 'react';
import { UserAllCard } from '../../../video-hub/scene/slices/user-all-cards';

type CardHolderProps = {
  additionalActions?: ReactNode;
};

export const CardHolder: FC<CardHolderProps> = ({ additionalActions }) => {
  return (
    <div className='flex h-[69px] w-full justify-between gap-5'>
      <div className='h-full grow'>{/* все остальные карты что получаются в игре */}</div>
      <div className='flex h-full w-[49px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] bg-white text-sm text-black'>
        <PlusIcon />
      </div>

      <UserAllCard />

      {additionalActions}
    </div>
  );
};
