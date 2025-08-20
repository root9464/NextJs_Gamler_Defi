'use client';
import SwapArrow from '@assets/svg/swap-arrow.svg';
import { motion } from 'motion/react';
import type { FC } from 'react';

type RollStatsProps = {
  swapTokens: () => void;
};

export const RollStats: FC<RollStatsProps> = ({ swapTokens }) => {
  return (
    <motion.div
      className='flex size-[30px] items-center justify-center rounded-full bg-[#FFBB05] cursor-pointer'
      whileHover={{ rotate: 180 }}
      transition={{ duration: 0.15, ease: 'easeInOut' }}
      onClick={swapTokens}>
      <SwapArrow />
    </motion.div>
  );
};
