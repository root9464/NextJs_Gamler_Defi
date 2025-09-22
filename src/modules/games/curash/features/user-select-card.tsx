/* eslint-disable @next/next/no-img-element */
'use client';
import { Modal } from '@/components/ui/modal';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { useAtomValue } from 'jotai';
import { useCallback, useEffect, useState } from 'react';

type PromptSelectResponse = {
  id: string;
  name: string;
  back_image_url: string;
  cards: string[];
};

export const UserSelectCard = () => {
  const [selectedDeck, setSelectedDeck] = useState<PromptSelectResponse | null>(null);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const socketManager = useAtomValue(socketAtom);

  const handleCardSelect = useCallback(
    (cardId: string) => {
      if (!selectedDeck) return;
      socketManager.gameController.selectCard(selectedDeck.id, cardId);
      onClose();
    },
    [selectedDeck, socketManager, onClose],
  );

  useEffect(() => {
    const handlePromptSelect = (data: PromptSelectResponse) => {
      setSelectedDeck(data);
      onOpen();
    };

    socketManager.on('prompt_select_card', handlePromptSelect);

    return () => {
      socketManager.off('prompt_select_card', handlePromptSelect);
    };
  }, [socketManager, onOpen]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Content size='7xl'>
        <Modal.Header />
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          <h1>Выберите карту</h1>
          <div className='flex gap-3 flex-wrap'>
            {selectedDeck?.cards.map((cardId) => (
              <img
                key={cardId}
                src={selectedDeck.back_image_url}
                alt='not found'
                className='w-[75px] h-[75px] sm:w-[120px] sm:h-[150px] cursor-pointer'
                onClick={() => handleCardSelect(cardId)}
              />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer />
      </Modal.Content>
    </Modal>
  );
};
