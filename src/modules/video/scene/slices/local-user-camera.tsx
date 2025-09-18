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
          'max-desktop-xs:w-full max-desktop-xs:px-2.5 max-desktop-xs:h-[77px] max-desktop-xs:py-1',
        )}>
        <div
          className={cn(
            'flex size-16 items-center justify-center rounded-full bg-neutral-700 text-xl font-bold text-gray-300',
            'max-desktop-xs:size-10 max-desktop-xs:self-center',
          )}>
          Вы
        </div>
        <div className='max-desktop-xs:text-xs mt-2 text-sm text-gray-400'>{player.name || player.id}</div>
      </div>
      <CardHolder userId={player.id} />
    </div>
  );
};
