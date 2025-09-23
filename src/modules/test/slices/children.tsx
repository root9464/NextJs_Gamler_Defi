'use client';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useModalManager } from '@/modules/video/scene/hooks/useModalManaget';

export const ChildModal = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useModalManager('child-modal');

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <Modal.Trigger onClick={onOpen}>Открыть дочернюю модалку</Modal.Trigger>
        <Modal.Content>
          <Modal.Header>Дочерняя модалка</Modal.Header>
          <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
            <p>Это дочерняя модалка. Родительская модалка закрыта.</p>
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
