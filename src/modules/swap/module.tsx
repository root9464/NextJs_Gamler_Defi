import { SwapStats } from './entities/swap-stats';
import { DynamicSwapInterface } from './exports/exports';

export const SwapModule = () => (
  <div className='flex h-fit w-[359px] flex-col gap-3 bg-[#F6FFED] p-4'>
    <h2 className='text-lg font-medium'>Конвертация:</h2>
    <DynamicSwapInterface />
    <SwapStats />
  </div>
);
