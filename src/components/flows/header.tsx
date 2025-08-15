'use client';
import { useBreadcrumbs } from '@shared/hooks/useBreadcrumbs';
import { cn } from '@shared/utils/tw.utils';
import type { ReactNode } from 'react';
import { type FC } from 'react';

import Logo from '@assets/svg/logo.svg';

import { NavBreadcrumbs } from '../slices/breadcrumbs';

import { DynamicMobileSheet } from '../exports/exports';
import { IsMobileFlow } from '../layouts/is-mobile-flow';
import { AccountInfo } from '../slices/account-info';

type HeaderProps = {
  className?: string;
  SocialLinks: ReactNode;
};

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
            <DynamicMobileSheet />
          </div>
        }
        desktop={
          <>
            <div className='flex flex-row items-center gap-6'>
              <Logo />
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
