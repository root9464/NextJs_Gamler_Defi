import AllMute from '@/assets/svg/allmute.svg';
import ArrowIco from '@/assets/svg/arrow-right.svg';
import CardHub from '@/assets/svg/cardhub.svg';
import ChangeIco from '@/assets/svg/change.svg';
import DiceIco from '@/assets/svg/dice.svg';
import ExitIco from '@/assets/svg/exit.svg';
import MenuHub from '@/assets/svg/menuhub.svg';
import MicroIco from '@/assets/svg/micro.svg';
import VideoIco from '@/assets/svg/video.svg';

//host && px-[13] : px-[53], host && ChangeIco : DiceIco, host && AllMute : null

export const ControlPanelAcceptance = () => {
  return (
    <div className='h-50 w-[333px] rounded-[11px] border-1 border-[#183410] bg-[#171918] px-[13px] py-[18px]'>
      <div className='flex w-full flex-col gap-5'>
        <div className='flex justify-between'>
          <div className='flex h-9 w-[26px] cursor-pointer items-center justify-center rounded-[3px] bg-linear-to-r from-[#BDC3C7] to-[#FFFFFF]'>
            <CardHub />
          </div>
          <div className='flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-white'>
            <VideoIco className='fill-black' />
          </div>
          <div className='flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-white'>
            <MicroIco className='fill-black' />
          </div>
          <div className='flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-white'>
            <AllMute />
          </div>
          <div className='flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-white'>
            <MenuHub />
          </div>
          <div className='flex h-[35px] w-[52px] cursor-pointer items-center justify-center rounded-[40px] bg-[#FF4343]'>
            <ExitIco />
          </div>
        </div>
        <div className='flex h-[39px] items-center justify-center gap-[10px]'>
          <p>Игрок</p>
          <ArrowIco />
          <div className='flex flex-col gap-[5px]'>
            <p className='text-xs'>Последний ход</p>
            <div className='flex items-center gap-[4px]'>
              <DiceIco className='h-[14.5px] w-[16.5px]' />
              <p>5</p>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center gap-5'>
          <div className='rounded-5 h-[47.5px] w-27 border-4 border-[#7D7B7B] bg-linear-to-r from-[#7D7B7B] to-[#010103]'></div>
          <DiceIco className='h-[43px] w-[37px] cursor-pointer' />
          <div className='flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-[#1890FF]'>
            <ChangeIco className='fill-white' />
          </div>
        </div>
      </div>
    </div>
  );
};
