'use client';
import DiceIcon from '@/assets/svg/dice.svg';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useAtomValue } from 'jotai';

export const RollDices = () => {
  const socketManager = useAtomValue(socketAtom);

  const handleRollDice = () => {
    console.log('roll dices');
    socketManager.gameController.rollDice();
  };

  return (
    <button className='h-fit w-fit cursor-pointer bg-transparent' onClick={handleRollDice}>
      <DiceIcon className='h-[43px] w-[37px]' />
    </button>
  );
};
