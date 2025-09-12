/* eslint-disable @next/next/no-img-element */
'use client';
import { Modal } from '@/components/ui/modal';
import type { ShowPlayerHandResult } from '@/modules/games/curash/flows/cardholder';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import type { FC } from 'react';

type Props = {
  hand: ShowPlayerHandResult[];
  userId: string;
};

export const UserAllCard: FC<Props> = ({ hand, userId }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger
        onClick={onOpen}
        className='flex h-full w-[49px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] bg-white text-sm text-black'>
        <div className='flex h-5 w-5 items-center justify-center rounded-full bg-[#FF4D4F] text-xs text-white'>1</div>
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
          </div>
        </Modal.Body>
        <Modal.Footer />
      </Modal.Content>
    </Modal>
  );
};
