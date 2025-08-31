'use client';
import { Modal } from '@/components/ui/modal';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

type RollDiceResponse = {
  client_id: string;
  dices: {
    faces: number;
    value: number[];
  };
};

export const DiceResultModal = () => {
  const [lastRoll, setLastRoll] = useState<RollDiceResponse | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const socketManager = useAtomValue(socketAtom);

  useEffect(() => {
    const unsubscribe = socketManager.on('dice_rolled', (data: RollDiceResponse) => {
      console.log('dice_rolled полученно', data);
      setLastRoll(data);
      onOpen();

      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    });

    return () => unsubscribe();
  }, [socketManager, onOpen, onClose]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Content>
        <Modal.Header />
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          <h1>Результат броска</h1>
          <div className='flex gap-3'>
            {lastRoll?.dices.value.map((diceValue, index) => (
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
