import SwapArrow from '@assets/svg/swap-arrow.svg';
import type { FC } from 'react';

type RollStatsProps = {
  swapTokens: () => void;
};

export const RollStats: FC<RollStatsProps> = ({ swapTokens }) => {
  return (
    <div className='flex size-[30px] items-center justify-center rounded-full bg-[#FFBB05]' onClick={swapTokens}>
      <SwapArrow />
    </div>
  );
};
