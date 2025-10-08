'use client';

import { cn } from '@/shared/utils/tw.utils';
import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import { type FC } from 'react';

import EventsIcon from '@assets/svg/enents.svg';
import ExchangeIcon from '@assets/svg/exchange.svg';
import MyGamesIcon from '@assets/svg/my-games.svg';
import MyPlayersIcon from '@assets/svg/my-players.svg';
import RefferalProgramIcon from '@assets/svg/refferal-program.svg';
import TicketsIcon from '@assets/svg/tickets.svg';
import TriggerSidebarIcon from '@assets/svg/trigger-sidebar.svg';

import { usePathname } from 'next/navigation';

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
    width: '15.2vw',
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 25,
      mass: 0.8,
    },
  },
  closed: {
    width: '80px',
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
    initial='open'
    className={cn('bg-uiPrimaryBg h-full shadow-black/10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]', className)}>
    <div className='flex h-full flex-col justify-between gap-3'>
      <SideBarBody isOpen={isOpen} />
      <SideBarFooter className={classNames?.footer ?? ''} onOpenChange={onOpenChange} />
    </div>
  </motion.div>
);

type SideBarBodyProps = {
  isOpen: boolean;
};

export const MENU_ITEMS = [
  { label: 'Размещенные игры', icon: MyPlayersIcon, href: '/account/published_games/' },
  { label: 'Мои игры', icon: MyGamesIcon, href: '/account/my-games/' },
  { label: 'События', icon: EventsIcon, href: '/account/events/' },
  { label: 'Мои игроки', icon: MyPlayersIcon, href: '/account/my-players/' },
  { label: 'Билеты', icon: TicketsIcon, href: '/account/tickets/' },
  { label: 'Парнерская программа', icon: RefferalProgramIcon, href: '/web3/referral-program' },
  { label: 'Обменник', icon: ExchangeIcon, href: '/web3/exchanger/' },
];

const bodyVariants: Variants = {
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
      delay: 0.1,
    },
  },
  closed: {
    transition: {
      duration: 0.2,
    },
  },
};

const linkVariants: Variants = {
  open: {
    paddingLeft: '1.5rem',
    paddingRight: '1rem',
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
      delay: 0.2,
    },
  },
  closed: {
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    transition: {
      duration: 0.1,
    },
  },
};

const textVariants: Variants = {
  open: {
    width: '100%',
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 25,
      mass: 0.8,
    },
  },
  closed: {
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

const SideBarBody: FC<SideBarBodyProps> = ({ isOpen }) => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <motion.div
      variants={bodyVariants}
      initial='open'
      animate={isOpen ? 'open' : 'closed'}
      className='flex h-full w-full flex-col items-center justify-center p-1'>
      <div className='flex w-full flex-1 flex-col gap-1'>
        {MENU_ITEMS.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            variants={linkVariants}
            initial='open'
            animate={isOpen ? 'open' : 'closed'}
            className={cn(
              'flex h-10 w-full flex-row items-center gap-2 rounded-lg transition-all duration-200',
              isActive(item.href) && 'bg-uiActiveMutedBlue',
            )}>
            <item.icon
              className={cn(
                'h-[14px] w-[14px] shrink-0 bg-transparent fill-black/85',
                isActive(item.href) && 'fill-uiActiveBlue bg-uiActiveMutedBlue',
              )}
            />
            <motion.div variants={textVariants} animate={isOpen ? 'open' : 'closed'} className='overflow-hidden whitespace-nowrap'>
              <span className={cn('text-sm text-black/85', isActive(item.href) && 'text-uiActiveBlue')}>{item.label}</span>
            </motion.div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

type SideBarFooterProps = {
  className: string;
  onOpenChange: () => void;
};

const SideBarFooter: FC<SideBarFooterProps> = ({ className, onOpenChange }) => (
  <div className={cn('flex h-[60px] w-full flex-col items-start justify-center border-t border-black/10 px-4 py-2', className)}>
    <TriggerSidebarIcon onClick={onOpenChange} />
  </div>
);
