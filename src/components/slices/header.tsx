import { useAccount } from '@/shared/hooks/api/useAccount';
import { useBreadcrumbs } from '@/shared/hooks/useBreadcrumbs';
import { cn } from '@/shared/utils/tw.utils';
import Logo from '@assets/svg/logo.svg';
import type { FC } from 'react';
import { Avatar } from '../ui/avatar';
import { Breadcrumbs } from '../ui/breadcrumbs';

import FacebookIcon from '@assets/svg/facebook.svg';
import TelegramIcon from '@assets/svg/telegram.svg';
import VkIcon from '@assets/svg/vk.svg';

import CoinIcon from '@assets/svg/coin.svg';
import OrangeHeartIcon from '@assets/svg/heart-orange.svg';
import HeartIcon from '@assets/svg/heart.svg';

import { useWindow } from '@/shared/hooks/useWindow';
import BaseAvatar from '@assets/svg/base-avatar.svg';
import { Skeleton } from '../ui/skeleton';
import { MobileSheet } from './mobile-sheet';

type HeaderProps = {
  className?: string;
};

export const Header: FC<HeaderProps> = ({ className }) => {
  const breadcrumbs = useBreadcrumbs({
    '/referral-program': 'Реферальная программа',
  });
  const { isMobile } = useWindow();

  return (
    <div className={cn('flex h-16 w-full flex-row items-center justify-between', isMobile ? 'px-4' : 'px-16', className)}>
      {!isMobile ? (
        <>
          <NavBreadcrumbs breadcrumbs={breadcrumbs} />
          <div className='flex w-fit flex-row items-center justify-between gap-[74px]'>
            <SocialLinks />
            <AccountInfo />
          </div>
        </>
      ) : (
        <div className='grid w-full grid-cols-[auto_1fr_auto] items-center justify-between gap-2.5'>
          <Logo className='w-[107px]' />
          <AccountInfo />
          <MobileSheet />
        </div>
      )}
    </div>
  );
};

const NavBreadcrumbs: FC<{ breadcrumbs: Record<string, string>[] }> = ({ breadcrumbs }) => (
  <div className='flex flex-row items-center gap-6'>
    <Logo />
    <Breadcrumbs>
      <Breadcrumbs.Item href='/' separator='slash' className='text-black/45 data-current:text-black'>
        Главная
      </Breadcrumbs.Item>
      {breadcrumbs.map((breadcrumb) => (
        <Breadcrumbs.Item key={breadcrumb.href} href={breadcrumb.href} separator='slash' className='text-black/45 data-current:text-black'>
          {breadcrumb.label}
        </Breadcrumbs.Item>
      ))}
    </Breadcrumbs>
  </div>
);

const SocialLinks = () => (
  <div className='grid grid-cols-[auto_auto] place-content-between content-center items-center gap-[70px]'>
    <a href='https://t.me/gamler_bot' target='_blank' className='hover:text-uiSecondaryText text-sm whitespace-nowrap text-black/85'>
      Напишите нам
    </a>
    <div className='flex flex-row items-center justify-center gap-2'>
      <div className='h-10 w-10 justify-center rounded-[12px] bg-[#F0F4FA] p-2.5'>
        <TelegramIcon />
      </div>
      <div className='h-10 w-10 justify-center rounded-[12px] bg-[#F0F4FA] p-2.5'>
        <FacebookIcon />
      </div>
      <div className='h-10 w-10 justify-center rounded-[12px] bg-[#F0F4FA] p-2.5'>
        <VkIcon />
      </div>
    </div>
  </div>
);

const AccountInfo = () => {
  const { data: account, isSuccess: isSuccessAccount, isLoading: isLoadingAccount, isError: isErrorAccount } = useAccount();
  return (
    <div className='flex w-fit flex-row items-center gap-4 sm:w-full sm:gap-6'>
      <div className='flex h-full w-fit flex-row items-center justify-center gap-1 sm:w-full'>
        <CoinIcon />
        {isSuccessAccount && <p className='text-sm'>{account?.coins_number}</p>}
        {!isSuccessAccount && <p className='text-sm'>0</p>}
      </div>
      <div className='flex h-full w-fit flex-row items-center justify-center gap-1.5 sm:w-full'>
        <HeartIcon />
        {isSuccessAccount && <p className='text-sm'>{account?.player_likes_number}</p>}
        {!isSuccessAccount && <p className='text-sm'>0</p>}
      </div>
      <div className='flex h-full w-fit flex-row items-center justify-center gap-1.5 sm:w-full'>
        <OrangeHeartIcon />
        {isSuccessAccount && <p className='text-sm'>{account?.host_likes_number}</p>}
        {!isSuccessAccount && <p className='text-sm'>0</p>}
      </div>
      <div className='ml-[6px] flex h-full w-fit flex-row items-center justify-center gap-1.5 sm:ml-0 sm:w-full'>
        {isSuccessAccount && account && <Avatar className='h-10 w-10' src={account?.user_photo_url} />}
        {isLoadingAccount && !isSuccessAccount && <Skeleton className='h-10 w-10 rounded-full' />}
        {isErrorAccount && <Avatar className='h-10 w-10' src={BaseAvatar.src} />}
      </div>
    </div>
  );
};
