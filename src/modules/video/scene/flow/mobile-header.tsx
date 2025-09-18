import { cn } from '@/shared/utils/tw.utils';
import { FC } from 'react';
import { MenuBar } from '../slices/menu-bar';
import { RemoteUsersCamera } from './remote-users-camera';

type MobileHeaderProps = {
  cardHolder: FC<{ userId: string }>;
};

export const MobileHeader: FC<MobileHeaderProps> = ({ cardHolder }) => {
  return (
    <div
      className={cn(
        'sticky top-0 z-[1] h-44 w-full px-3 py-2',
        'flex flex-col justify-between',
        'bg-neutral-800/50 backdrop-blur-[120px]',
        'rounded-br-2xl rounded-bl-2xl border border-white/10',
        'min-[1100px]:hidden',
      )}>
      <MenuBar />
      <div className='test-box scrollbar-hide flex w-full flex-row gap-3 overflow-x-scroll'>
        <RemoteUsersCamera cardHolder={cardHolder} />
      </div>
    </div>
  );
};
