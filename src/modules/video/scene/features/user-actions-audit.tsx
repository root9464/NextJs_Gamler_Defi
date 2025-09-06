'use client';
import ArrowIcon from '@/assets/svg/arrow-right.svg';
import DiceIcon from '@/assets/svg/dice.svg';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

type RollDiceResponse = {
  client_id: string;
  dices: {
    faces: number;
    value: number[];
  };
};

export const UserActionsAudit = () => {
  const socketManager = useAtomValue(socketAtom);
  const [lastRoll, setLastRoll] = useState<RollDiceResponse | null>(null);

  useEffect(() => {
    const unsubscribe = socketManager.on('dice_rolled', (data: RollDiceResponse) => {
      console.log('dice_rolled полученно', data);
      setLastRoll(data);
    });

    return () => unsubscribe();
  }, [socketManager]);
  return (
    <div className='flex h-[39px] items-center justify-center gap-[10px] **:text-white'>
      <p className='text-base font-medium'>Игрок</p>
      <ArrowIcon />
      <div className='flex flex-col gap-[5px]'>
        <p className='text-xs'>Последний ход</p>
        <div className='flex items-center gap-[4px] bg-transparent'>
          <DiceIcon className='h-4 w-5' />
          {lastRoll ? lastRoll.dices.value.map((diceValue) => <p key={diceValue}>{diceValue}</p>) : <p>0</p>}
        </div>
      </div>
    </div>
  );
};
