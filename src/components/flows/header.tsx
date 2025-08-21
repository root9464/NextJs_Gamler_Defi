'use client';
import { useBreadcrumbs } from '@shared/hooks/useBreadcrumbs';
import { cn } from '@shared/utils/tw.utils';
import type { ReactNode } from 'react';
import { type FC } from 'react';

import Logo from '@assets/svg/logo.svg';

import { NavBreadcrumbs } from '../slices/breadcrumbs';

import { DynamicBalanceInHeader, DynamicMobileSheet } from '../exports/exports';
import { AccountInfo } from '../slices/account-info';

type HeaderProps = {
  className?: string;
  SocialLinks: ReactNode;
};

export const Header: FC<HeaderProps> = ({ className, SocialLinks }) => {
  const breadcrumbs = useBreadcrumbs({
    '/referral-program': 'Реферальная программа',
    '/exchanger': 'Обменник',
  });

  return (
    <div className={cn('mobile:pr-[65px] mobile:pl-[50px] flex h-[64px] w-full flex-row items-center justify-between', className)}>
      <div className='max-mobile:grid max-mobile:w-full max-mobile:grid-cols-[auto_1fr_auto] max-mobile:items-center max-mobile:justify-between max-mobile:gap-2.5 max-mobile:px-4 hidden'>
        <Logo className='w-[107px]' />
        <DynamicBalanceInHeader />
        <DynamicMobileSheet />
      </div>
      <div className='max-mobile:hidden flex w-full flex-row items-center justify-between gap-[4vw]'>
        <div className='flex flex-row items-center gap-6'>
          <Logo />
          <NavBreadcrumbs breadcrumbs={breadcrumbs} />
        </div>
        <div className='flex flex-row items-center justify-between gap-[4vw]'>
          {SocialLinks}
          <AccountInfo />
        </div>
      </div>
    </div>
  );
};
