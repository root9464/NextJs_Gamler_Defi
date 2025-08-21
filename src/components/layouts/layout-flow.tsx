'use client';

import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { cn } from '@/shared/utils/tw.utils';
import { LayoutGroup, motion } from 'motion/react';
import { type FC, type ReactNode } from 'react';
import { DynamicSideBar } from '../exports/exports';

type LayoutFlowProps = {
  children: ReactNode;
  classNames?: Partial<{
    sidebar: string;
    content: string;
  }>;
};

export const LayoutFlow: FC<LayoutFlowProps> = ({ children, classNames }) => {
  const { isOpen, onOpenChange } = useDisclosure({
    defaultOpen: true,
  });

  return (
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
  );
};
