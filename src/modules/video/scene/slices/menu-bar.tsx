import { IssuingCards } from '@/modules/games/curash/flows/issuing-card';
import DiceImage from '@assets/img/dice.png';
import CoinIcon from '@assets/svg/coin.svg';
import Image from 'next/image';
import { Timer } from './timer';

export const MenuBar = () => {
  return (
    <div className='flex w-full flex-row items-center gap-4 rounded-xl border border-white/10 bg-[#050E21] px-4 py-3'>
      <Timer />
      <div className='flex flex-row items-center gap-2.5'>
        <Image src={DiceImage} alt='dice' className='h-[30px] w-[27px] cursor-pointer' />
        <p>x 4</p>
      </div>
      <div className='flex flex-row items-center gap-2.5'>
        <div className='flex size-[35px] items-center justify-center rounded-full bg-[#222226]'>
          <CoinIcon />
        </div>
        <p className='text-[#FFEA05]'>20</p>
      </div>
      <IssuingCards />
    </div>
  );
};
