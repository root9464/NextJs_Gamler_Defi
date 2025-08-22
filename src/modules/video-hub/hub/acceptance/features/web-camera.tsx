import HeartIco from '@/assets/svg/hearthub.svg';
import InfoIco from '@/assets/svg/info.svg';
import MuteIco from '@/assets/svg/mute.svg';

export const WebCameraAcceptance = () => {
  return (
    <div className='relative flex h-50 w-[332px] flex-col justify-between rounded-[11px] bg-red-300 px-[15px] py-[18px]'>
      <div className='flex w-full justify-between'>
        <div className='flex h-[22px] w-11 items-center justify-center rounded-[55px] bg-white text-[12px] text-black'>
          <p>1:00</p>
        </div>
        <div className='flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#222226]/50'>
          <MuteIco />
        </div>
      </div>
      {/* <video src='' /> */}
      <div className='flex h-[35px] w-full items-center justify-between'>
        <h1>Игрок 1</h1>
        <div className='flex gap-[10px]'>
          <div className='flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-[#222226]'>
            <InfoIco />
          </div>
          <div className='flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-[#222226]'>
            <HeartIco />
          </div>
        </div>
      </div>
    </div>
  );
};
