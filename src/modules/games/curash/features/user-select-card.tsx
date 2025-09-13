/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { Modal } from '@/components/ui/modal';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

type PromptSelectResponse = {
  id: string;
  name: string;
  back_image_url: string;
  cards: string[];
};

export const UserSelectCard = () => {
  const [selectedDeck, setSelectedDeck] = useState<PromptSelectResponse | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const socketManager = useAtomValue(socketAtom);

  const handleCardSelect = useCallback(
    (cardId: string) => {
      if (!selectedDeck) return;

      setSelectedCardId(cardId);
      socketManager.gameController.selectCard(selectedDeck.id, cardId);
      console.log('cardId', cardId);
      console.log('selectedDeck.id', selectedDeck.id);
    },
    [selectedDeck, socketManager],
  );

  useEffect(() => {
    const handlePromptSelect = (data: PromptSelectResponse) => {
      setSelectedDeck(data);
      setSelectedCardId(null);
      onOpen();
    };

    socketManager.on('prompt_select_card', handlePromptSelect);

    return () => {
      socketManager.off('prompt_select_card', handlePromptSelect);
    };
  }, [socketManager, onOpen]);

  const handleClose = useCallback(() => {
    setSelectedCardId(null);
    onClose();
  }, [onClose]);

  return (
    <Modal isOpen={isOpen} onOpenChange={handleClose}>
      <Modal.Content>
        <Modal.Header />
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          <h1>Выберите карту</h1>
          <div className='flex gap-3'>
            {selectedDeck?.cards.map((cardId) => (
              <Image
                key={cardId}
                src={selectedDeck.back_image_url}
                alt='not found'
                width={120}
                height={120}
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
