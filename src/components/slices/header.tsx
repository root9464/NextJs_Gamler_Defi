'use client';
import { useAccount } from '@/shared/hooks/api/useAccount';
import { useBreadcrumbs } from '@/shared/hooks/useBreadcrumbs';
import { cn } from '@/shared/utils/tw.utils';
import type { ReactNode } from 'react';
import { memo, type FC } from 'react';
import { Avatar } from '../ui/avatar';

import BaseAvatar from '@assets/svg/base-avatar.svg';
import CoinIcon from '@assets/svg/coin.svg';
import OrangeHeartIcon from '@assets/svg/heart-orange.svg';
import HeartIcon from '@assets/svg/heart.svg';
import Logo from '@assets/svg/logo.svg';

import { LazyMobileSheet } from '../exports/exports-lazy';
import { IsMobileFlow } from '../layouts/is-mobile-flow';
import { Skeleton } from '../ui/skeleton';
import { NavBreadcrumbs } from './breadcrumbs';

type HeaderProps = {
  className?: string;
  SocialLinks: ReactNode;
};

export const Header: FC<HeaderProps> = ({ className, SocialLinks }) => {
  const breadcrumbs = useBreadcrumbs({
    '/referral-program': 'Реферальная программа',
  });

  return (
    <div className={cn('flex h-16 w-full flex-row items-center justify-between px-[50px]', className)}>
      <IsMobileFlow
        mobile={
          <div className='grid w-full grid-cols-[auto_1fr_auto] items-center justify-between gap-2.5'>
            <Logo className='w-[107px]' />
            <AccountInfo />
            <LazyMobileSheet />
          </div>
        }
        desktop={
          <>
            <NavBreadcrumbs breadcrumbs={breadcrumbs} />
            <div className='flex w-fit flex-row items-center justify-between gap-[74px]'>
              {SocialLinks}
              <AccountInfo />
            </div>
          </>
        }
      />
    </div>
  );
};

type StatProps = {
  icon: React.ComponentType;
  value?: number;
};

const Stat: FC<StatProps> = memo(({ icon: Icon, value = 0 }) => (
  <div className='flex h-full w-fit flex-row items-center justify-center gap-1 sm:w-full'>
    <Icon />
    <p className='text-sm'>{value}</p>
  </div>
));
Stat.displayName = 'Stat';

const AccountInfo: FC = () => {
  const { data: account, isSuccess, isLoading, isError } = useAccount();

  const coins = isSuccess ? account?.coins_number : 0;
  const playerLikes = isSuccess ? account?.player_likes_number : 0;
  const hostLikes = isSuccess ? account?.host_likes_number : 0;

  const avatar = isSuccess ? account?.user_photo_url : isError ? BaseAvatar.src : null;

  return (
    <div className='flex w-fit flex-row items-center gap-4 sm:w-full sm:gap-6'>
      <Stat icon={CoinIcon} value={coins} />
      <Stat icon={HeartIcon} value={playerLikes} />
      <Stat icon={OrangeHeartIcon} value={hostLikes} />

      <div className='ml-[6px] flex h-full w-fit flex-row items-center justify-center gap-1.5 sm:ml-0 sm:w-full'>
        {avatar && <Avatar className='h-10 w-10' src={avatar} />}
        {isLoading && !isSuccess && <Skeleton className='h-10 w-10 rounded-full' />}
      </div>
    </div>
  );
};
