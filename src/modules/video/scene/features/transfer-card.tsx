/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import type { Player } from '@/modules/video/scene/store/players';
import { playersAtom } from '@/modules/video/scene/store/players';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { useAtomValue } from 'jotai';
import { useState, type FC } from 'react';

type TransferCardModalProps = {
  cardId: string;
  deckId: string;
  img: string;
};

export const TransferCardModal: FC<TransferCardModalProps> = ({ cardId, deckId, img }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const socketManager = useAtomValue(socketAtom);
  const Players = useAtomValue(playersAtom);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  const transferCard = () => socketManager.gameController.transferCard(deckId, cardId, selectedPlayerId!);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger onClick={onOpen} className='w-full font-normal text-black sm:w-fit'>
        <Button className='w-full font-normal sm:w-fit' intent='primary'>
          передать
        </Button>
      </Modal.Trigger>
      <Modal.Content className=''>
        <Modal.Header>Выдача карт игрокам</Modal.Header>
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          <div className='flex flex-col gap-4'>
            <UsersRender Players={Players} selectedPlayerId={selectedPlayerId} onSelectPlayer={setSelectedPlayerId} />
            <img src={img} alt='nf' />
          </div>
        </Modal.Body>
        <Modal.Footer className='flex h-full items-center justify-end sm:h-8'>
          <Button onClick={onClose} className='w-full font-normal text-red-500 sm:w-fit' intent='plain'>
            Отмена
          </Button>
          <Button className='w-full font-normal sm:w-fit' intent='primary' onClick={transferCard}>
            передать карту
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
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
      <h2 className='font-semibold'>Выберите игрока, которому будет переданна карта</h2>
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
