'use client';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { cn } from '@shared/utils/tw.utils';
import { LayoutGroup, motion } from 'motion/react';
import type { FC, ReactNode } from 'react';
import { DynamicSideBar } from '../exports/exports';
import { Header } from '../flows/header';
import { SocialLinks } from '../slices/social-links';

type PageLayoutProps = {
  children: ReactNode;
  classNames?: Partial<{
    header: string;
    sidebar: string;
    content: string;
  }>;
};

export const PageLayout: FC<Readonly<PageLayoutProps>> = ({ children, classNames }) => {
  const { isOpen, onOpenChange } = useDisclosure({
    defaultOpen: true,
  });
  return (
    <div className={cn('flex h-full w-full flex-col', classNames?.header)}>
      <Header className={classNames?.header} SocialLinks={<SocialLinks />} />
      <div className='flex h-full flex-1 flex-row'>
        <LayoutGroup>
          <DynamicSideBar
            className={cn('max-mobile:hidden sticky top-0 h-full w-[285px]', classNames?.sidebar)}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
          <motion.div layout className={cn('h-full flex-1 overflow-y-auto', classNames?.content)}>
            {children}
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
};
