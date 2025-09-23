'use client';
import { Button, buttonStyles } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useModalManager } from '@/modules/video/scene/hooks/useModalManaget';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { cn } from '@/shared/utils/tw.utils';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Card = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  task: string;
};

export const SelectedCard = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useModalManager('selected-card');
  const socketManager = useAtomValue(socketAtom);
  const [selectedCard, setSelectedCard] = useState<Card>();

  const showCardEveryone = (id: string) => {
    socketManager.gameController.showEveryoneCard(id);
    onClose();
  };

  useEffect(() => {
    const unsubscribe = socketManager.on('card_selected', (data) => {
      setSelectedCard(data);
      onOpen();
    });

    return () => unsubscribe();
  }, [onOpen, socketManager]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Content>
        <Modal.Header />
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          <div className='flex w-full justify-center'>
            {selectedCard && <Image src={selectedCard.image_url} alt='not found' width={200} height={400} />}
          </div>
          <div className='flex gap-2.5'>
            <Button
              className={cn(buttonStyles({ intent: 'primary', size: 'sm' }))}
              onClick={() => selectedCard && showCardEveryone(selectedCard.id)}>
              Показать
            </Button>
            <Button className={cn(buttonStyles({ intent: 'primary', size: 'sm' }))}>Передать</Button>
            <Button className='w-full font-normal sm:w-fit' intent='primary'>
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
