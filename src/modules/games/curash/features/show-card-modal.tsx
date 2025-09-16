'use client';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

type CardRevealedResponse = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  task: string;
};

export const ShowCardModal = () => {
  const [cardData, setCardData] = useState<CardRevealedResponse | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const socketManager = useAtomValue(socketAtom);

  const handleCardRevealed = useCallback(
    (data: CardRevealedResponse) => {
      setCardData(data);
      onOpen();
    },
    [onOpen],
  );

  useEffect(() => {
    console.log('подписка на событие card_revealed');
    socketManager.on('card_revealed', handleCardRevealed);

    return () => {
      socketManager.off('card_revealed', handleCardRevealed);
    };
  }, [socketManager, handleCardRevealed]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Content>
        <Modal.Header />
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          {cardData && <Image src={cardData.image_url} alt={cardData.title} width={400} height={300} />}
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
