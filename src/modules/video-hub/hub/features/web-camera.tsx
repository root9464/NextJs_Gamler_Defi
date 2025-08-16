export const WebCamera = () => {
  return (
    <div className='relative flex h-[200px] w-[332px] flex-col justify-between rounded-[11px] bg-red-300 px-[15px] py-[18px]'>
      <div className='flex h-[22px] w-[44px] items-center justify-center rounded-[55px] bg-white text-[12px] text-black'>
        <p>1:00</p>
      </div>
      {/* <video src='' /> */}
      <div className='flex h-[35px] w-full items-center justify-between'>
        <h1>Игрок 1</h1>
        <div className='flex gap-[10px]'>
          <div className='h-[35px] w-[35px] cursor-pointer rounded-full bg-[#222226]'></div>
          <div className='h-[35px] w-[35px] cursor-pointer rounded-full bg-[#222226]'></div>
        </div>
      </div>
    </div>
  );
};
