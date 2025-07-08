'use client';

import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { useWindow } from '@/shared/hooks/useWindow';
import { cn } from '@/shared/utils/tw.utils';
import { LayoutGroup, motion } from 'motion/react';
import { type FC, type ReactNode } from 'react';
import { DynamicSideBar } from '../exports/exports-dynamic';

type LayoutFlowProps = {
  children: ReactNode;
  classNames?: Partial<{
    sidebar: string;
    content: string;
  }>;
};

export const LayoutFlow: FC<LayoutFlowProps> = ({ children, classNames }) => {
  const { isMobile } = useWindow();
  const { isOpen, onOpenChange } = useDisclosure({
    defaultOpen: true,
  });

  return (
    <div className='flex flex-1 flex-row'>
      <LayoutGroup>
        {!isMobile && <DynamicSideBar className={cn('h-full w-[285px]', classNames?.sidebar)} isOpen={isOpen} onOpenChange={onOpenChange} />}
        <motion.div layout className={cn('h-full flex-1', classNames?.content)}>
          {children}
        </motion.div>
      </LayoutGroup>
    </div>
  );
};
