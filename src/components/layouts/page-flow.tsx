'use client';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { useWindow } from '@/shared/hooks/useWindow';
import { cn } from '@shared/utils/tw.utils';
import { LayoutGroup, motion } from 'motion/react';
import type { FC, ReactNode } from 'react';
import { Header } from '../slices/header';
import { SideBar } from '../slices/side-bar';

type PageFlowProps = {
  children: ReactNode;
  classNames?: Partial<{
    header: string;
    sidebar: string;
    content: string;
  }>;
};

export const PageFlow: FC<Readonly<PageFlowProps>> = ({ children, classNames }) => {
  const { isOpen, onOpenChange } = useDisclosure();
  const { isMobile } = useWindow();

  return (
    <div className={cn('flex h-full w-full flex-col', classNames?.header)}>
      <Header className={classNames?.header} />
      <div className='flex flex-1 flex-row'>
        <LayoutGroup>
          {!isMobile && <SideBar className={cn('h-full w-[285px]', classNames?.sidebar)} isOpen={isOpen} onOpenChange={onOpenChange} />}
          <motion.div layout className={cn('h-full flex-1', classNames?.content)}>
            {children}
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
};
