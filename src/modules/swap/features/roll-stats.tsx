'use client';
import SwapArrow from '@assets/svg/swap-arrow.svg';
import { motion, useCycle } from 'motion/react';
import type { FC } from 'react';

type RollStatsProps = {
  swapTokens: () => void;
};

export const RollStats: FC<RollStatsProps> = ({ swapTokens }) => {
  const [rotate, cycleRotate] = useCycle(0, 180);
  return (
    <motion.div
      className='flex size-[30px] cursor-pointer items-center justify-center rounded-full bg-[#FFBB05]'
      animate={{ rotate }}
      transition={{ duration: 0.15, ease: 'easeInOut' }}
      onClick={() => {
        cycleRotate();
        swapTokens();
      }}>
      <SwapArrow />
    </motion.div>
  );
};
