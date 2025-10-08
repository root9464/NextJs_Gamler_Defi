'use client';
import { useAccount } from '@/shared/hooks/api/useAccount';
import { cn } from '@/shared/utils/tw.utils';
import { Skeleton } from '@ui/skeleton';
import type { ComponentType, FC, SVGProps } from 'react';
import { memo } from 'react';

import BaseAvatar from '@assets/svg/base-avatar.svg';
import CoinIcon from '@assets/svg/coin.svg';
import OrangeHeartIcon from '@assets/svg/heart-orange.svg';
import HeartIcon from '@assets/svg/heart.svg';
import { Avatar } from '../ui/avatar';

type StatProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  value?: number;
  className?: string;
};

const Stat: FC<StatProps> = memo(({ icon: Icon, value = 0, className }) => (
  <div className={cn('mobile:w-[55px] mr-[5px] ml-[10px] flex h-full w-[50px] flex-row items-center gap-[4px]', className)}>
    <Icon className='size-[18px]' />
    <p className='mobile:text-sm text-xs'>{value}</p>
  </div>
));
Stat.displayName = 'Stat';

export const AccountInfo: FC = () => {
  const { data: account, isSuccess, isLoading, isError } = useAccount();

  const coins = isSuccess ? account?.coins_number : 0;
  const playerLikes = isSuccess ? account?.player_likes_number : 0;
  const hostLikes = isSuccess ? account?.host_likes_number : 0;

  console.log(account?.user_photo_url);
  const avatar = isSuccess && account?.user_photo_url && account.user_photo_url.trim() !== '' ? account.user_photo_url : BaseAvatar.src;

  return (
    <div className='mobile:max-w-[289px] mobile:gap-0 flex h-full w-full max-w-[180px] flex-row items-center justify-between gap-1'>
      <div className='flex flex-row items-center'>
        <Stat icon={CoinIcon} value={coins} />
        <Stat icon={HeartIcon} value={playerLikes} />
        <Stat icon={OrangeHeartIcon} value={hostLikes} />
      </div>
      <div className='mobile:ml-6 ml-2 flex h-full w-fit flex-row items-center justify-end'>
        {avatar && <Avatar src={avatar} alt='Avatar' className='mobile:h-[38px] mobile:w-[38px] h-[32px] w-[32px]' />}
        {(isLoading || !isSuccess || isError) && <Skeleton className='mobile:h-10 mobile:w-10 h-8 w-8 rounded-full' />}
      </div>
    </div>
  );
};
