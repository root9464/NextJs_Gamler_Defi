/* eslint-disable @next/next/no-img-element */
'use client';
import CardHubIcon from '@/assets/svg/cardhub.svg';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { playersAtom } from '@/modules/video/scene/store/players';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { useAtomValue } from 'jotai';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

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

export const GiveUserCard = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const socketManager = useAtomValue(socketAtom);
  const [hand, setHands] = useState<ShowPlayerHandResult[]>([]);

  const sendId = (userId: string) => {
    console.log('Запрос колод с сервера');
    socketManager.gameController.showPlayerHand(userId);
    console.log('socketManager', socketManager);
  };

  useEffect(() => {
    if (!isOpen) return;
    console.log('Подписка на событие got_decks');
    socketManager.on('show_player_hand_result', (data: ShowPlayerHandResult[]) => {
      console.log('got_decks получено', data);
      setHands(data);
    });
  }, [isOpen, socketManager]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger
        onClick={onOpen}
        className='flex h-9 w-[26px] cursor-pointer items-center justify-center rounded-[3px] bg-linear-to-r from-[#BDC3C7] to-[#FFFFFF]'>
        <CardHubIcon />
      </Modal.Trigger>
      <Modal.Content className=''>
        <Modal.Header>Карты игрока</Modal.Header>
        <Modal.Body className='flex flex-col gap-5 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          <UsersRender sendId={sendId} />
          <div className='flex flex-col gap-2.5'>
            {hand.map((deck) => (
              <div key={deck.deck_id} className='flex flex-col gap-2.5'>
                <h3>{deck.deck_name}</h3>
                <div className='flex w-full gap-2.5'>
                  {deck.cards.map(({ image_url, id, title }) => (
                    <img src={image_url} key={id} alt={title} className='h-[150px] w-[150px]' />
                  ))}
                </div>
              </div>
            ))}
          </div>
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

type PropsUser = {
  sendId: (id: string) => void;
};

const UsersRender: FC<PropsUser> = ({ sendId }) => {
  const Players = useAtomValue(playersAtom);

  return (
    <div className='flex flex-col gap-2.5'>
      <h2 className='font-semibold'>Выберите игрока</h2>
      <div className='flex w-full gap-2.5'>
        {Players.map(({ id }) => (
          <div
            onClick={() => sendId(id)}
            key={id}
            className='flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-[#b9bbbe] focus:border-2 focus:border-[#3c3e3f]'
            tabIndex={0}>
            {id}
          </div>
        ))}
      </div>
    </div>
  );
};
