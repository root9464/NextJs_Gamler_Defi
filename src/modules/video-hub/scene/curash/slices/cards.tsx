import MoneyIco from '@/assets/svg/money.svg';
import PlusIco from '@/assets/svg/plus.svg';

export const CardsCurash = () => {
  return (
    <div className='flex h-[69px] w-full justify-between gap-5'>
      <div className='h-full grow'></div>
      <div className='flex h-full w-[49px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] bg-white text-sm text-black'>
        <PlusIco />
      </div>
      <div className='flex h-full w-[49px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] bg-white text-sm text-black'>
        <div className='flex h-5 w-5 items-center justify-center rounded-full bg-[#FF4D4F] text-xs text-white'>1</div>
        <p>Все</p>
      </div>
      <div className='flex h-full w-[49px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] bg-[#005C2F] text-sm text-white'>
        <MoneyIco />
        <p>0 +</p>
      </div>
    </div>
  );
};
