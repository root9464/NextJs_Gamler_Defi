'use client';
import AllMute from '@/assets/svg/allmute.svg';
import ArrowIco from '@/assets/svg/arrow-right.svg';
import DiceIco from '@/assets/svg/dice.svg';
import MenuHub from '@/assets/svg/menu-curash.svg';
import MicroIco from '@/assets/svg/micro.svg';
import VideoIco from '@/assets/svg/video.svg';
import { IssuingCards } from '@components/flows/issuing-cards';
import { CardsModal } from '../slices/cards-modal';
import { CoinModal } from '../slices/coin-modal';
import { DiceModal } from '../slices/dice-modal';
import { EndCard } from '../slices/end-game';
import { TimerModal } from '../slices/timer-modal';

//host && px-[13] : px-[53], host && ChangeIco : DiceIco, host && AllMute : null, exitIco если не ведущий то w-[52px]

const Users = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

export const ControlPanelCurash = () => {
  return (
    <div className='h-50 w-[333px] rounded-[11px] border-1 border-[#183410] bg-[#171918] px-[13px] py-[18px]'>
      <div className='flex w-full flex-col gap-5'>
        <div className='flex justify-between'>
          <div className='flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-white'>
            <AllMute />
          </div>
          <IssuingCards Users={Users} />
          <CardsModal />
          <div className='flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-white'>
            <VideoIco className='fill-black' />
          </div>
          <div className='flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-white'>
            <MicroIco className='fill-black' />
          </div>
          <CoinModal />
          <div className='flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-white'>
            <MenuHub />
          </div>
          <EndCard />
        </div>
        <div className='flex h-[39px] items-center justify-center gap-2.5'>
          <p>Игрок</p>
          <ArrowIco />
          <div className='flex flex-col gap-[5px]'>
            <p className='text-[12px]'>Последний ход</p>
            <div className='flex items-center gap-[4px]'>
              <DiceIco className='h-[14px] w-[16px]' />
              <p>5</p>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center gap-5'>
          <TimerModal />
          <DiceIco className='h-[43px] w-[37px] cursor-pointer' />
          <DiceModal />
        </div>
      </div>
    </div>
  );
};
