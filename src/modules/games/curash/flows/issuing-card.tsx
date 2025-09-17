'use client';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import type { Player } from '@/modules/video/scene/store/players';
import { playersAtom } from '@/modules/video/scene/store/players';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { cn } from '@/shared/utils/tw.utils';
import PlusIco from '@assets/svg/plus.svg';
import { useAtomValue } from 'jotai';
import { useEffect, useState, type FC } from 'react';

type Card = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  task: string;
};

type DeckFromServer = {
  deck: {
    id: string;
    name: string;
    back_image_url: string;
    cards: Card[];
  };
};

type IssuingCardsProps = {
  className?: string;
};

export const IssuingCards: FC<IssuingCardsProps> = ({ className }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const socketManager = useAtomValue(socketAtom);
  const Players = useAtomValue(playersAtom);
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [decks, setDecks] = useState<DeckFromServer[]>([]);

  const GiveDeckForSelection = () => {
    if (selectedDeckId && selectedPlayerId) {
      socketManager.gameController.giveDeckForSelection(selectedDeckId, selectedPlayerId);
      setSelectedDeckId(null);
      setSelectedPlayerId(null);
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    console.log('Запрос колод с сервера');
    socketManager.gameController.getDecks();
    console.log('socketManager', socketManager);

    console.log('Подписка на событие got_decks');
    socketManager.on('got_decks', (data: DeckFromServer[]) => {
      console.log('got_decks получено', data);
      setDecks(data);
    });
  }, [isOpen, socketManager]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger
        onClick={onOpen}
        className={cn(
          'flex h-[36px] w-[26px] cursor-pointer items-center justify-center rounded-[3px] bg-linear-to-r from-[#BDC3C7] to-[#FFFFFF]',
          className,
        )}>
        <PlusIco />
      </Modal.Trigger>
      <Modal.Content className=''>
        <Modal.Header>Выдача карт игрокам</Modal.Header>
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          <div className='flex flex-col gap-4'>
            <Deck selectedDeckId={selectedDeckId} onSelectDeck={setSelectedDeckId} decks={decks} />
            <UsersRender Players={Players} selectedPlayerId={selectedPlayerId} onSelectPlayer={setSelectedPlayerId} />
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
  decks: DeckFromServer[];
  selectedDeckId: string | null;
  onSelectDeck: (deckId: string) => void;
};

const Deck: FC<DeckProps> = ({ selectedDeckId, onSelectDeck, decks }) => {
  return (
    <div className='flex flex-col gap-2.5'>
      <h2 className='font-semibold'>Выберите колоду</h2>
      {decks.map(({ deck: { name, id } }) => (
        <div className='group flex cursor-pointer items-center gap-2.5' tabIndex={0} onClick={() => onSelectDeck(id)} key={id}>
          <div className='relative flex items-center justify-center'>
            <input
              type='checkbox'
              className='h-4 w-4 appearance-none rounded-full border border-black group-hover:border-[#1890FF] group-focus:border-[#1890FF]'
              checked={selectedDeckId === id}
              readOnly
            />
            <div className='absolute hidden h-2 w-2 rounded-full bg-[#1890FF] group-focus:block' />
            {selectedDeckId === id && <div className='absolute h-2 w-2 rounded-full bg-[#1890FF]' />}
          </div>
          <p>{name}</p>
        </div>
      ))}
    </div>
  );
};

type UsersRenderProps = {
  selectedPlayerId: string | null;
  onSelectPlayer: (id: string) => void;
  Players: Player[];
};

const UsersRender: FC<UsersRenderProps> = ({ Players, selectedPlayerId, onSelectPlayer }) => {
  return (
    <div className='flex flex-col gap-2.5'>
      <h2 className='font-semibold'>Выберите игрока, которому будет выдана карта</h2>
      <div className='flex w-full gap-2.5'>
        {Players.map(({ id }) => (
          <div
            key={id}
            className={`flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-[#b9bbbe] ${selectedPlayerId === id ? 'border-2 border-[#1890FF]' : 'focus:border focus:border-[#1890FF]'}`}
            onClick={() => onSelectPlayer(id)}>
            {id}
          </div>
        ))}
      </div>
    </div>
  );
};
