/* eslint-disable @next/next/no-img-element */
'use client';
import { Button, buttonStyles } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { cn } from '@/shared/utils/tw.utils';
import { useAtomValue } from 'jotai';
import type { FC } from 'react';
import { TransferCardModal } from './transfer-card';

type CardsProps = {
  cardId: string;
  img: string;
  deckId: string;
};

export const NotOwn: FC<CardsProps> = ({ cardId, img, deckId }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const socketManager = useAtomValue(socketAtom);

  const returnCardDeck = () => socketManager.gameController.returnCardToDeck(deckId, cardId);
  const showCardEveryone = (cardId: string) => socketManager.gameController.showEveryoneCard(cardId);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger
        onClick={onOpen}
        className='flex h-[69px] w-[49px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] border border-white'>
        <img src={img} alt='not found' className='h-full w-full' />
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header />
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          <img src={img} alt='not found' />
          <div className='flex gap-2.5'>
            <Button className={cn(buttonStyles({ intent: 'primary', size: 'sm' }))} onClick={() => showCardEveryone(cardId)}>
              Показать
            </Button>
            <div onClick={onClose}>
              <TransferCardModal deckId={deckId} cardId={cardId} img={img} />
            </div>
            <Button className='w-full font-normal sm:w-fit' intent='primary' onClick={returnCardDeck}>
              Вернуть в колоду
            </Button>
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
