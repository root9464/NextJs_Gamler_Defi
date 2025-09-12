'use client';
import CoinIcon from '@/assets/svg/coin.svg';
import { NotOwn } from '@/modules/video/scene/features/not-own-card';
import { UserAllCard } from '@/modules/video/scene/slices/user-all-cards';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useAtomValue } from 'jotai';
import { useEffect, useState, type FC } from 'react';
import { IssuingCardDeck } from '../features/issuing-card-deck';
import { SettingsCoins } from '../features/setting-coins';

type Card = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  task: string;
};

export type ShowPlayerHandResult = {
  background_image_url: string;
  cards: Card[];
  deck_id: string;
  deck_name: string;
};

type CardHolderProps = {
  userId: string;
};

export const CardHolder: FC<CardHolderProps> = ({ userId }) => {
  const socketManager = useAtomValue(socketAtom);
  const [hand, setHand] = useState<ShowPlayerHandResult[]>([]);

  useEffect(() => {
    setInterval(() => {
      socketManager.gameController.showPlayerHand(userId);
      socketManager.on('show_player_hand_result', (data: ShowPlayerHandResult[]) => {
        console.log('show_player_hand_result получено', data);
        setHand(data);
      });
    }, 100000);
  }, []);

  const allCards = hand.flatMap((deck) =>
    deck.cards.map((card) => ({
      ...card,
      deck_id: deck.deck_id,
    })),
  );

  const firstTwoCards = allCards.slice(0, 2);
  console.log('userId-cardholder', userId);
  console.log('firstTwoCards', firstTwoCards);
  console.log('hand', hand);

  return (
    <div className='flex h-[69px] w-full justify-between gap-5'>
      <div className='flex h-full grow gap-5'>
        {firstTwoCards.map((card) => (
          <NotOwn key={`${card.deck_id}-${card.id}`} img={card.image_url} id={card.id} deckId={card.deck_id} />
        ))}
      </div>
      <UserAllCard userId={userId} hand={hand} />
      <IssuingCardDeck userId={userId} />
      <SettingsCoins className='flex h-full w-[49px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] bg-[#005C2F] text-sm text-white'>
        <CoinIcon />
        <p>0 +</p>
      </SettingsCoins>
    </div>
  );
};
