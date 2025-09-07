'use client';
import { Modal } from '@/components/ui/modal';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { useAtomValue } from 'jotai';
import { useCallback, useEffect, useState } from 'react';

type Dice = {
  faces: number;
  value: number[];
};

type RolledDiceResponse = {
  client_id: string;
  dices: Dice;
};

const DICE_DISPLAY_DURATION = 3000;

export const ThrownDice = () => {
  const [lastRoll, setLastRoll] = useState<RolledDiceResponse | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const socketManager = useAtomValue(socketAtom);

  const handleDiceRoll = useCallback(
    (data: RolledDiceResponse) => {
      setLastRoll(data);
      onOpen();
    },
    [onOpen],
  );

  useEffect(() => {
    const unsubscribe = socketManager.on('dice_rolled', handleDiceRoll);
    return () => unsubscribe();
  }, [socketManager, handleDiceRoll]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
      timer = setTimeout(onClose, DICE_DISPLAY_DURATION);
    }

    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Content isDismissable={false} closeButton={false}>
        <Modal.Header />
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 py-5'>
          <h1 className='text-lg font-semibold'>Результат броска</h1>
          <div className='flex gap-3'>{lastRoll?.dices.value.map((diceValue, index) => <DiceValue key={index} value={diceValue} />)}</div>
        </Modal.Body>
        <Modal.Footer />
      </Modal.Content>
    </Modal>
  );
};

type DiceValueProps = {
  value: number;
};

const DiceValue = ({ value }: DiceValueProps) => (
  <div className='flex h-18 w-18 items-center justify-center rounded-xs bg-red-900 text-3xl font-bold text-white'>{value}</div>
);
