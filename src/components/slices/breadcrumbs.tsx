import type { FC } from 'react';
import { Breadcrumbs } from '../ui/breadcrumbs';

type NavBreadcrumbsProps = {
  breadcrumbs: Record<string, string>[];
};

export const NavBreadcrumbs: FC<NavBreadcrumbsProps> = ({ breadcrumbs }) => (
  <Breadcrumbs className='h-[22px]'>
    <Breadcrumbs.Item href='/' separator='slash' className='text-sm leading-6 text-black/45 data-current:text-black'>
      Главная
    </Breadcrumbs.Item>
    {breadcrumbs.map((breadcrumb) => (
      <Breadcrumbs.Item key={breadcrumb.href} href={breadcrumb.href} separator='slash' className='text-sm text-black/45 data-current:text-black'>
        {breadcrumb.label}
      </Breadcrumbs.Item>
    ))}
  </Breadcrumbs>
);
