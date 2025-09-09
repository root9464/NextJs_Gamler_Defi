'use client';
import CardHubIcon from '@/assets/svg/cardhub.svg';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { playersAtom } from '@/modules/video/scene/store/players';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

type DeckFromServer = {
  deck: {
    id: string;
    name: string;
    back_image_url: string;
    cards: string[];
  };
};

export const GiveUserCard = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const socketManager = useAtomValue(socketAtom);
  const [decks, setDecks] = useState<DeckFromServer[]>([]);

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
        className='flex h-9 w-[26px] cursor-pointer items-center justify-center rounded-[3px] bg-linear-to-r from-[#BDC3C7] to-[#FFFFFF]'>
        <CardHubIcon />
      </Modal.Trigger>
      <Modal.Content className=''>
        <Modal.Header>Карты игрока</Modal.Header>
        <Modal.Body className='flex flex-col gap-5 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          <UsersRender />
          <div className='flex flex-col gap-2.5'>
            <h2 className='font-semibold'>Кураж продаж</h2>
            <div className='flex w-full gap-2.5'>
              <div className='h-[150px] w-[150px] rounded-[6px] bg-blue-500 focus:border-2 focus:border-[#3c3e3f]' tabIndex={0}></div>
              <div className='h-[150px] w-[150px] rounded-[6px] bg-blue-500 focus:border-2 focus:border-[#3c3e3f]' tabIndex={0}></div>
              <div className='h-[150px] w-[150px] rounded-[6px] bg-blue-500 focus:border-2 focus:border-[#3c3e3f]' tabIndex={0}></div>
            </div>
          </div>
          <Saller />
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

const UsersRender = () => {
  const Players = useAtomValue(playersAtom);

  return (
    <div className='flex flex-col gap-2.5'>
      <h2 className='font-semibold'>Выберите игрока</h2>
      <div className='flex w-full gap-2.5'>
        {Players.map(({ id }) => (
          <div
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

const Saller = () => {
  return (
    <div className='flex flex-col gap-2.5'>
      <h2 className='font-semibold'>Инструменты успешного продавца</h2>
      <div className='flex w-full gap-2.5'>
        <div className='bg-epta h-[150px] w-[150px] rounded-[6px] focus:border-2 focus:border-[#3c3e3f]' tabIndex={0}></div>
        <div className='bg-epta h-[150px] w-[150px] rounded-[6px] focus:border-2 focus:border-[#3c3e3f]' tabIndex={0}></div>
      </div>
    </div>
  );
};
