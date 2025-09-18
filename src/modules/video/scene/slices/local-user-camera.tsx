import { cn } from '@/shared/utils/tw.utils';
import { FC } from 'react';
import { Player } from '../store/players';

type LocalUserBannerProps = {
  player: Player;
  cardHolder: FC<{ userId: string }>;
};

export const LocalUserPlaceholder: FC<LocalUserBannerProps> = ({ cardHolder: CardHolder, player }) => {
  return (
    <div className='max-desktop-xs:w-full flex flex-col gap-2.5'>
      <div
        className={cn(
          'relative flex h-50 w-[332px] shrink-0 flex-col justify-between overflow-hidden rounded-[11px] bg-blue-300 px-[15px] py-[18px]',
          'max-desktop-xs:w-30 max-desktop-xs:px-2.5 max-desktop-xs:h-[77px] py-1',
        )}>
        <div className='relative z-10 flex w-full justify-between'>
          <div
            className={cn(
              'flex h-[22px] w-11 items-center justify-center rounded-[55px] bg-white text-xs text-black',
              'max-desktop-xs:text-[9px] max-desktop-xs:w-8 max-desktop-xs:h-5',
            )}>
            <p>Вы</p>
          </div>
        </div>
      </div>
      <CardHolder userId={player.id} />
    </div>
  );
};
