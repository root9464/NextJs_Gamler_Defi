import MoneyIco from '@/assets/svg/money.svg';
import PlusIco from '@/assets/svg/plus.svg';

export const WebCardsCurash = () => {
  return (
    <div className='flex h-[69.89px] w-full justify-between gap-5'>
      <div className='h-full grow'></div>
      <div className='flex h-full w-[49.76px] cursor-pointer flex-col items-center justify-center gap-[8px] rounded-[6px] bg-white text-[14px] text-black'>
        <PlusIco />
      </div>
      <div className='flex h-full w-[49.76px] cursor-pointer flex-col items-center justify-center gap-[8px] rounded-[6px] bg-white text-[14px] text-black'>
        <div className='flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#FF4D4F] text-[12px] text-white'>1</div>
        <p>Все</p>
      </div>
      <div className='flex h-full w-[49.76px] cursor-pointer flex-col items-center justify-center gap-[8px] rounded-[6px] bg-[#005C2F] text-[14px] text-white'>
        <MoneyIco />
        <p>0 +</p>
      </div>
    </div>
  );
};
