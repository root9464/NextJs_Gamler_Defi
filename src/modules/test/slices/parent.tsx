'use client';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useModalManager } from '@/modules/video/scene/hooks/useModalManaget';
import { ChildModal } from './children';

export const ParentModal = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useModalManager('parent-modal');

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <Modal.Trigger onClick={onOpen}>Открыть родительскую модалку</Modal.Trigger>
        <Modal.Content>
          <Modal.Header>Родительская модалка</Modal.Header>
          <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
            <p>Это родительская модалка. Нажмите, чтобы открыть дочернюю.</p>
            <ChildModal />
          </Modal.Body>
          <Modal.Footer className='flex h-full items-center justify-end sm:h-8'>
            <Button onClick={onClose} className='w-full font-normal text-red-500 sm:w-fit' intent='plain'>
              Закрыть
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
