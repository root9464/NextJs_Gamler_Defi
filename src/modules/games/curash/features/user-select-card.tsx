'use client';
import { Modal } from '@/components/ui/modal';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type PromptSelectResponse = {
  id: string;
  name: string;
  back_image_url: string;
  cards: string[];
};

export const UserSelectCard = () => {
  const [lastRoll, setLastRoll] = useState<PromptSelectResponse | null>(null);
  const [showImage, setShowImage] = useState<number | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const socketManager = useAtomValue(socketAtom);
  console.log('showImage', showImage);

  useEffect(() => {
    const subscribe = socketManager.on('prompt_select_card', (data: PromptSelectResponse) => {
      console.log('prompt_select_card получено', data);
      setLastRoll(data);
      setShowImage(null);
      onOpen();
    });

    return () => subscribe();
  }, [socketManager, onOpen]);

  const handleModalClick = (index: number) => {
    if (lastRoll && !showImage) {
      setShowImage(index);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Content>
        <Modal.Header />
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          <h1>Выберите карту</h1>
          <div className='flex gap-3'>
            {showImage && lastRoll?.back_image_url ? (
              <Image src={lastRoll.back_image_url} alt='Выбранная карта' className='h-auto w-full object-cover' />
            ) : (
              lastRoll?.cards.map((_, index) => (
                <div
                  onClick={() => handleModalClick(index)}
                  className='flex h-[75px] w-[75px] items-center justify-center rounded-xs bg-black text-3xl font-bold text-white'
                  key={index}></div>
              ))
            )}
          </div>
        </Modal.Body>
        <Modal.Footer />
      </Modal.Content>
    </Modal>
  );
};
