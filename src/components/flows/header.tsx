'use client';
import { useBreadcrumbs } from '@shared/hooks/useBreadcrumbs';
import { cn } from '@shared/utils/tw.utils';
import type { ReactNode } from 'react';
import { type FC } from 'react';

import Logo from '@assets/svg/logo.svg';

import { NavBreadcrumbs } from '../slices/breadcrumbs';

import { LazyMobileSheet } from '../exports/exports-lazy';
import { IsMobileFlow } from '../layouts/is-mobile-flow';
import { AccountInfo } from '../slices/account-info';
import { BalanceInHeader } from '../slices/balance-in-header';

type HeaderProps = {
  className?: string;
  SocialLinks: ReactNode;
};

const excludedPaths = ['/exchanger'];

export const Header: FC<HeaderProps> = ({ className, SocialLinks }) => {
  const breadcrumbs = useBreadcrumbs({
    '/referral-program': 'Реферальная программа',
  });

  return (
    <div className={cn('flex h-[64px] w-full flex-row items-center justify-between pr-[65px] pl-[50px]', className)}>
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
            <div className='flex flex-row items-center gap-6'>
              <BalanceInHeader excludedPaths={excludedPaths} />
              <NavBreadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className='flex flex-row items-center justify-between gap-[4vw]'>
              {SocialLinks}
              <AccountInfo />
            </div>
          </>
        }
      />
    </div>
  );
};
