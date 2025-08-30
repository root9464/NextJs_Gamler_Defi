'use client';
import DiceIcon from '@/assets/svg/dice.svg';
import { Modal } from '@/components/ui/modal';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { useAtomValue } from 'jotai';
import { useState } from 'react';

type RollDiceResponse = {
  client_id: string;
  dices: {
    faces: number;
    value: number[];
  };
};

export const RollDices = () => {
  const [lastRoll, setLastRoll] = useState<RollDiceResponse | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const socketManager = useAtomValue(socketAtom);

  const handleRollDice = () => {
    console.log('roll dices');
    socketManager.rollDice();

    const unsubscribe = socketManager.on('dice_rolled', (data: RollDiceResponse) => {
      console.log('Кубики брошены!', data);
      console.log('Client ID:', data.client_id);
      console.log('Значения кубиков:', data.dices.value);

      setLastRoll(data);
    });

    setTimeout(() => {
      unsubscribe();
      console.log('Перестали слушать dice_rolled');
    }, 5000);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger
        onClick={() => {
          onOpen();
          handleRollDice();
        }}
        className='h-fit w-fit cursor-pointer bg-transparent'>
        <DiceIcon className='h-[43px] w-[37px]' />
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header />
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          <h1>Результат броска</h1>
          <div className='flex gap-3'>
            {lastRoll &&
              lastRoll.dices.value.map((diceValue, index) => (
                <div
                  className='flex h-[75px] w-[75px] items-center justify-center rounded-xs bg-red-900 text-3xl font-bold text-white'
                  key={index}>
                  {diceValue}
                </div>
              ))}
          </div>
        </Modal.Body>
        <Modal.Footer />
      </Modal.Content>
    </Modal>
  );
};
