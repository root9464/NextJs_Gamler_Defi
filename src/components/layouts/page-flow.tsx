'use client';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { cn } from '@shared/utils/tw.utils';
import { LayoutGroup, motion } from 'motion/react';
import type { FC, ReactNode } from 'react';
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
  return (
    <div className={cn('flex h-full w-full flex-col', classNames?.header)}>
      <div className={cn('h-16 w-full', classNames?.header)}>header</div>
      <div className='flex flex-1 flex-row'>
        <LayoutGroup>
          <SideBar className={cn('h-full w-[285px]', classNames?.sidebar)} isOpen={isOpen} onOpenChange={onOpenChange} />
          <motion.div layout className={cn('h-full flex-1', classNames?.content)}>
            {children}
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
};
