import { SwapInterface } from './flows/swap-interface';

export const SwapModule = () => {
  return (
    <div className='flex h-fit w-[359px] flex-col gap-3 bg-[#F6FFED] p-4'>
      <h2 className='text-lg font-medium'>Конвертация:</h2>
      <h3 className='text-sm font-medium'>Вы отправляете:</h3>
      <SwapInterface />
    </div>
  );
};
