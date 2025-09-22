'use client';
import { Modal } from '@/components/ui/modal';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { useAtomValue } from 'jotai';
import { useEffect, useState, type FC } from 'react';
import { NotOwn } from '../features/not-own-card';

type Props = {
  userId: string;
};

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

export const UserAllCard: FC<Props> = ({ userId }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const socketManager = useAtomValue(socketAtom);
  const [hands, setHands] = useState<Map<string, Deck[]>>(new Map());

  const getCard = () => {
    socketManager.sendMessage('game_action', { type: 'show_player_hand', payload: { player_id: userId } });
  };

  useEffect(() => {
    const unsubscribe = socketManager.on('show_player_hand_result', (payload: ShowPlayerHandResult) => {
      setHands((prev) => new Map(prev).set(payload.player_id, payload.decks));
    });
    return () => unsubscribe();
  }, [socketManager, userId]);

  const totalCards = Array.from(hands.get(userId) || []).reduce((total, deck) => total + deck.cards.length, 0);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger
        onClick={() => {
          getCard();
          onOpen();
        }}
        className='flex h-full w-[49px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] bg-white text-sm text-black'>
        <div className='flex h-5 w-5 items-center justify-center rounded-full bg-[#FF4D4F] text-xs text-white'>{totalCards}</div>
        <p>Все</p>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header className='pb-[0px]'>Карты игрока</Modal.Header>
        <Modal.Body className='flex flex-col gap-3 pt-[22px] pb-[17px]'>
          <div className='flex flex-col gap-2.5'>
            <div className='flex flex-col gap-2.5'>
              <div className='flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#1890FF] bg-[#b9bbbe]'>
                {userId}
              </div>
            </div>
            <div className='flex flex-col gap-2.5'>
              {(hands.get(userId) || []).map((deck) => (
                <div key={deck.deck_id} className='flex flex-col gap-2'>
                  <h3 className='text-sm font-semibold text-black'>{deck.deck_name}</h3>
                  <div className='flex gap-2'>
                    {deck.cards.map((card) => (
                      <NotOwn key={card.id} img={card.image_url} cardId={card.id} deckId={deck.deck_id} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer />
      </Modal.Content>
    </Modal>
  );
};
