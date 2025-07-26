import { cn } from '@shared/utils/tw.utils';
import type { FC, ReactNode } from 'react';
import { DynamicLayoutFlow } from '../exports/exports';
import { Header } from '../flows/header';
import { SocialLinks } from '../slices/social-links';

type PageFlowProps = {
  children: ReactNode;
  classNames?: Partial<{
    header: string;
    sidebar: string;
    content: string;
  }>;
};

export const PageFlow: FC<Readonly<PageFlowProps>> = ({ children, classNames }) => {
  return (
    <div className={cn('flex h-full w-full flex-col', classNames?.header)}>
      <Header className={classNames?.header} SocialLinks={<SocialLinks />} />
      <DynamicLayoutFlow classNames={classNames}>{children}</DynamicLayoutFlow>
    </div>
  );
};
