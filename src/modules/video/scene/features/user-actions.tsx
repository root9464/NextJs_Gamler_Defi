'use client';
import ArrowIcon from '@/assets/svg/arrow-right.svg';
import DiceIcon from '@/assets/svg/dice.svg';
import { useAtomValue } from 'jotai';
import { socketAtom } from '../store/socket';

export const UserActions = () => {
  const socketManager = useAtomValue(socketAtom);

  const handleRollDice = () => socketManager.rollDice();

  return (
    <div className='flex h-[39px] items-center justify-center gap-[10px] **:text-white'>
      <p className='text-base font-medium'>Игрок</p>
      <ArrowIcon />
      <div className='flex flex-col gap-[5px]'>
        <p className='text-xs'>Последний ход</p>
        <button className='flex items-center gap-[4px] bg-transparent' onClick={handleRollDice}>
          <DiceIcon className='h-4 w-5' />
          <p>5</p>
        </button>
      </div>
    </div>
  );
};
