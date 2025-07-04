'use client';

import Logo from '@assets/svg/logo.svg';
import type { FC } from 'react';
import { Breadcrumbs } from '../ui/breadcrumbs';

type NavBreadcrumbsProps = {
  breadcrumbs: Record<string, string>[];
};

export const NavBreadcrumbs: FC<NavBreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
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
};
