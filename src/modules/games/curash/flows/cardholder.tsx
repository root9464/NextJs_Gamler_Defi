'use client';
import { NotOwn } from '@/modules/video/scene/features/not-own-card';
import { UserAllCard } from '@/modules/video/scene/slices/user-all-cards';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { IssuingCardDeck } from '../features/issuing-card-deck';
import { SettingsCoinsDeck } from '../features/setting-coins-deck';

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

export const CardHolder = ({ userId }: { userId: string }) => {
  const socketManager = useAtomValue(socketAtom);
  const [hands, setHands] = useState<Map<string, Deck[]>>(new Map());

  useEffect(() => {
    setInterval(() => {
      socketManager.sendMessage('game_action', { type: 'show_player_hand', payload: { player_id: userId } });
    }, 10000);
    const unsubscribe = socketManager.on('show_player_hand_result', (payload: ShowPlayerHandResult) => {
      setHands((prev) => new Map(prev).set(payload.player_id, payload.decks));
    });
    return () => unsubscribe();
  }, [socketManager, userId]);

  return (
    <div className='max-desktop-xs:hidden flex h-[69px] w-full justify-between gap-5'>
      <div className='flex h-fit grow gap-5'>
        {(hands.get(userId) || []).slice(0, 2).map((deck) => (
          <div className='flex gap-2'>
            {deck.cards.slice(0, 1).map((card) => (
              <NotOwn key={card.id} img={card.image_url} cardId={card.id} deckId={deck.deck_id} />
            ))}
          </div>
        ))}
      </div>
      <UserAllCard userId={userId} />
      <IssuingCardDeck userId={userId} />
      <SettingsCoinsDeck userId={userId} />
    </div>
  );
};
