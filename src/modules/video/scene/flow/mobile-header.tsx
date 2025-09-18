'use client';
import { cn } from '@/shared/utils/tw.utils';
import { motion } from 'motion/react';
import { FC, useState } from 'react';
import { MenuBar } from '../slices/menu-bar';
import { RemoteUsersCamera } from './remote-users-camera';

type MobileHeaderProps = {
  cardHolder: FC<{ userId: string }>;
};

const expandedStyles = {
  container: 'grid grid-cols-2 gap-3 justify-items-center',
  item: 'max-h-[150px] w-full max-w-[160px]',
};

const collapsedStyles = {
  container: 'flex-row gap-3 flex-nowrap',
  item: 'h-min w-[calc(50%-6px)]',
};

export const MobileHeader: FC<MobileHeaderProps> = ({ cardHolder }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      drag='y'
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        if (info.offset.y > 50) setIsExpanded(true);
        else if (info.offset.y < -50) setIsExpanded(false);
      }}
      initial={{ height: '190px' }}
      animate={{ height: isExpanded ? '50vh' : '190px' }}
      transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'sticky top-0 z-[1] w-full',
        'bg-neutral-800/50 backdrop-blur-[120px]',
        'rounded-br-2xl rounded-bl-2xl border border-white/10',
        'min-[1100px]:hidden',
        'flex flex-col',
      )}>
      <div className='flex flex-1 flex-col gap-2.5 px-3 py-2'>
        <MenuBar />
        <RemoteUsersCamera cardHolder={cardHolder} classNames={isExpanded ? expandedStyles : collapsedStyles} />
      </div>

      <div className='flex justify-center pb-2'>
        <div className='h-1 w-12 cursor-grab rounded-full bg-white/30' />
      </div>
    </motion.div>
  );
};
