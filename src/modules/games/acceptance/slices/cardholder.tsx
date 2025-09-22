export const CardHolder = () => {
  return (
    <div className='flex h-[69.89px] w-full justify-between'>
      <div className='flex h-full w-[49.76px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] bg-white text-[14px] text-black'>
        <div className='flex h-5 w-5 items-center justify-center rounded-full bg-[#FF4D4F] text-xs text-white'>1</div>
        <p>Все</p>
      </div>
      <div className='h-full grow'>{/* все остальные карты что получаются в игре */}</div>
    </div>
  );
};
