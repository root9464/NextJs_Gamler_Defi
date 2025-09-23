import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const modalManagerAtom = atom<string | null>(null);

export function useModalManager(key: string) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeModal, setActiveModal] = useAtom(modalManagerAtom);

  const openModal = useCallback(() => {
    console.log(`[ModalManager] Попытка открыть модалку: ${key}`);
    if (activeModal && activeModal !== key) {
      console.log(`[ModalManager] Закрываю предыдущую модалку: ${activeModal}`);
    }
    setActiveModal(key);
    onOpen();
  }, [activeModal, key, onOpen, setActiveModal]);

  const closeModal = useCallback(() => {
    console.log(`[ModalManager] Закрываю модалку: ${key}`);
    if (activeModal === key) {
      setActiveModal(null);
    }
    onClose();
  }, [activeModal, key, onClose, setActiveModal]);

  const handleOpenChange = useCallback(() => {
    if (!isOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [isOpen, openModal, closeModal]);

  const isActive = activeModal === key;

  return {
    isOpen: isActive,
    onOpen: openModal,
    onClose: closeModal,
    onOpenChange: handleOpenChange,
    getButtonProps: (props: any = {}) => ({
      ...props,
      'aria-expanded': isActive,
      onClick: handleOpenChange,
    }),
  };
}
