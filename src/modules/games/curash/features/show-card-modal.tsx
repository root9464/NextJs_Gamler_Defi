'use client';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type CardRevealedResponse = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  task: string;
};

export const ShowCardModal = () => {
  const [show, setShow] = useState<CardRevealedResponse | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const socketManager = useAtomValue(socketAtom);

  useEffect(() => {
    const subscribe = socketManager.on('card_revealed', (data: CardRevealedResponse) => {
      console.log('card_revealed полученно', data);
      onOpen();
      setShow(data);
    });

    console.log('Результат вызова socketManager.on:', subscribe);
  }, []);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger />
      <Modal.Content className=''>
        <Modal.Header />
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          {show && <Image src={show.image_url} alt='not found' />}
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
