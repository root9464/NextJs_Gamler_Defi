'use client';
import CardHubIcon from '@/assets/svg/cardhub.svg';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { playersAtom } from '@/modules/video/scene/store/players';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { IconFlow } from '../flow/icon-flow';
import { NotOwn } from './not-own-card';

type Card = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  task: string;
};

type Deck = {
  deck_id: string;
  deck_name: string;
  background_image_url: string;
  cards: Card[];
};

type ShowPlayerHandResult = {
  player_id: string;
  decks: Deck[];
};

export const UserCards = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const socketManager = useAtomValue(socketAtom);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [hands, setHands] = useState<Map<string, Deck[]>>(new Map());

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
    socketManager.sendMessage('game_action', {
      type: 'show_player_hand',
      payload: { player_id: userId },
    });
  };

  useEffect(() => {
    if (!isOpen) return;

    const unsubscribe = socketManager.on('show_player_hand_result', (payload: ShowPlayerHandResult) => {
      setHands((prev) => new Map(prev).set(payload.player_id, payload.decks));
    });

    return () => unsubscribe();
  }, [isOpen, socketManager]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <IconFlow className='bg-white' as={Modal.Trigger} onClick={onOpen}>
        <CardHubIcon className='h-full w-full' />
      </IconFlow>
      <Modal.Content className=''>
        <Modal.Header>Карты игрока</Modal.Header>
        <Modal.Body className='flex flex-col gap-5 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          <UsersRender selectedUserId={selectedUserId} onUserSelect={handleUserSelect} />
          {selectedUserId && (
            <div className='flex flex-col gap-2.5'>
              {(hands.get(selectedUserId) || []).map((deck) => (
                <div key={deck.deck_id} className='flex flex-col gap-2.5'>
                  <h3>{deck.deck_name}</h3>
                  <div className='flex h-max w-full gap-2.5'>
                    {deck.cards.map((card) => (
                      <NotOwn key={card.id} img={card.image_url} cardId={card.id} deckId={deck.deck_id} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className='flex h-full items-center justify-end sm:h-8'>
          <Button onClick={onClose} className='w-full font-normal text-red-500 sm:w-fit' intent='plain'>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

type UsersRenderProps = {
  selectedUserId: string | null;
  onUserSelect: (userId: string) => void;
};

const UsersRender: React.FC<UsersRenderProps> = ({ selectedUserId, onUserSelect }) => {
  const Players = useAtomValue(playersAtom);

  return (
    <div className='flex flex-col gap-2.5'>
      <h2 className='font-semibold'>Выберите игрока</h2>
      <div className='flex w-full gap-2.5'>
        {Players.map(({ id }) => (
          <div
            onClick={() => onUserSelect(id)}
            key={id}
            className={`flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-[#b9bbbe] focus:border-2 focus:border-[#3c3e3f] ${
              selectedUserId === id ? 'border-2 border-[#1890FF]' : ''
            }`}
            tabIndex={0}>
            {id}
          </div>
        ))}
      </div>
    </div>
  );
};
