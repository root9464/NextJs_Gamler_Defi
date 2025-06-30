'use client';

import { cn } from '@/shared/utils/tw.utils';
import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import { type FC } from 'react';
import { Button } from '../ui/button';

type SideBarProps = {
  classNames?: Partial<{
    body: string;
    footer: string;
  }>;
  className: string;
  isOpen: boolean;
  defaultOpen?: boolean;
  onOpenChange: () => void;
};

const sidebarVariants: Variants = {
  open: {
    width: '200px',
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 25,
      mass: 0.8,
    },
  },
  closed: {
    width: '72px',
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 25,
      mass: 0.8,
    },
  },
};

export const SideBar: FC<SideBarProps> = ({ classNames, className, isOpen, onOpenChange }) => (
  <motion.div
    animate={isOpen ? 'open' : 'closed'}
    variants={sidebarVariants}
    initial='closed'
    className={cn('bg-uiPrimaryBg h-full shadow-black/10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]', className)}>
    <div className='flex h-full flex-col justify-between gap-3'>
      <SideBarBody isOpen={isOpen} />
      <SideBarFooter className={classNames?.footer ?? ''} isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  </motion.div>
);

type SideBarBodyProps = {
  isOpen: boolean;
};

const bodyVariants: Variants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
      delay: 0.1,
    },
  },
  closed: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2,
    },
  },
};

const SideBarBody: FC<SideBarBodyProps> = ({ isOpen }) => (
  <motion.div
    variants={bodyVariants}
    initial='closed'
    animate={isOpen ? 'open' : 'closed'}
    className='flex h-full w-full flex-1 flex-col px-4 py-2'>
    {isOpen && <div className='flex-1'>Sidebar Content</div>}
  </motion.div>
);

type SideBarFooterProps = {
  className: string;
  isOpen: boolean;
  onOpenChange: () => void;
};

const SideBarFooter: FC<SideBarFooterProps> = ({ className, isOpen, onOpenChange }) => (
  <div className={cn('flex h-[60px] w-full flex-col border-t border-black/10 px-4 py-2', className)}>
    <Button onClick={onOpenChange} className='w-full'>
      {isOpen ? 'Close' : 'Open'}
    </Button>
  </div>
);
