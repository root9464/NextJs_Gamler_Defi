'use client';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import PlusIco from '@assets/svg/plus.svg';
import { useAtomValue } from 'jotai';
import { useState, type FC } from 'react';

type UsersProps = {
  Users: { playerId: string }[];
};

const deckData = [
  { name: 'Кураж продаж (52 карт)', deck_id: '1' },
  { name: 'Инструменты успешного продавца (52 карт)', deck_id: '2' },
  { name: 'Новичок (54 карт)', deck_id: '3' },
  { name: 'Продавец (36 карт)', deck_id: '4' },
  { name: 'Руководитель продаж (24 карт)', deck_id: '5' },
  { name: 'Пожелания от игры до руководителя (10 карт)', deck_id: '6' },
  { name: 'Пожелания от игры после руководителя (10 карт)', deck_id: '7' },
];

export const IssuingCards: FC<UsersProps> = ({ Users }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const socketManager = useAtomValue(socketAtom);
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  const GiveDeckForSelection = () => {
    if (selectedDeckId && selectedPlayerId) {
      socketManager.gameController.giveDeckForSelection(selectedDeckId, selectedPlayerId);
      onClose();
      setSelectedDeckId(null);
      setSelectedPlayerId(null);
    } else {
      console.warn('Пожалуйста, выберите колоду и игрока.');
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger
        onClick={onOpen}
        className='flex h-[36px] w-[26px] cursor-pointer items-center justify-center rounded-[3px] bg-linear-to-r from-[#BDC3C7] to-[#FFFFFF]'>
        <PlusIco />
      </Modal.Trigger>
      <Modal.Content className=''>
        <Modal.Header>Выдача карт игрокам</Modal.Header>
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          <div className='flex flex-col gap-4'>
            <Deck selectedDeckId={selectedDeckId} onSelectDeck={setSelectedDeckId} />
            <UsersRender Users={Users} selectedPlayerId={selectedPlayerId} onSelectPlayer={setSelectedPlayerId} />
          </div>
        </Modal.Body>
        <Modal.Footer className='flex h-full items-center justify-end sm:h-8'>
          <Button onClick={onClose} className='w-full font-normal text-red-500 sm:w-fit' intent='plain'>
            Отмена
          </Button>
          <Button onClick={GiveDeckForSelection} className='w-full font-normal sm:w-fit' intent='primary'>
            Выдать карту
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

type DeckProps = {
  selectedDeckId: string | null;
  onSelectDeck: (deckId: string) => void;
};

const Deck: FC<DeckProps> = ({ selectedDeckId, onSelectDeck }) => {
  return (
    <div className='flex flex-col gap-2.5'>
      <h2 className='font-semibold'>Выберите колоду</h2>
      {deckData.map(({ name, deck_id }) => (
        <div className='group flex cursor-pointer items-center gap-2.5' tabIndex={0} onClick={() => onSelectDeck(deck_id)}>
          <div className='relative flex items-center justify-center'>
            <input
              type='checkbox'
              className='h-4 w-4 appearance-none rounded-full border border-black group-hover:border-[#1890FF] group-focus:border-[#1890FF]'
              checked={selectedDeckId === deck_id}
              readOnly
            />
            <div className='absolute hidden h-2 w-2 rounded-full bg-[#1890FF] group-focus:block' />
            {selectedDeckId === deck_id && <div className='absolute h-2 w-2 rounded-full bg-[#1890FF]' />}
          </div>
          <p>{name}</p>
        </div>
      ))}
    </div>
  );
};

type UsersRenderProps = UsersProps & {
  selectedPlayerId: string | null;
  onSelectPlayer: (playerId: string) => void;
};

const UsersRender: FC<UsersRenderProps> = ({ Users, selectedPlayerId, onSelectPlayer }) => {
  return (
    <div className='flex flex-col gap-2.5'>
      <h2 className='font-semibold'>Выберите игрока, которому будет выдана карта</h2>
      <div className='flex w-full gap-2.5'>
        {Users.map(({ playerId }) => (
          <div
            className={`flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-[#b9bbbe] ${selectedPlayerId === playerId ? 'border-2 border-[#1890FF]' : 'focus:border focus:border-[#1890FF]'}`}
            onClick={() => onSelectPlayer(playerId)}>
            {playerId}
          </div>
        ))}
      </div>
    </div>
  );
};
