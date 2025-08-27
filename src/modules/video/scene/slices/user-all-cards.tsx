'use client';
import { Modal } from '@/components/ui/modal';
import { useDisclosure } from '@/shared/hooks/useDisclosure';

export const UserAllCard = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger
        onClick={onOpen}
        className='flex h-full w-[49px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] bg-white text-sm text-black'>
        <div className='flex h-5 w-5 items-center justify-center rounded-full bg-[#FF4D4F] text-xs text-white'>1</div>
        <p>Все</p>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header className='pb-[0px]'>Карты игрока</Modal.Header>
        <Modal.Body className='flex flex-col gap-3 pt-[22px] pb-[17px]'>
          <div className='flex flex-col gap-2.5'>
            <div className='flex flex-col gap-2.5'>
              <div className='h-[50px] w-[50px] rounded-full border border-[#1890FF] bg-[#b9bbbe]' />
            </div>
            <div className='flex flex-col gap-2.5'>
              <h2>Кураж продаж</h2>
              <div className='flex w-full gap-2.5'>
                <div className='h-[150px] w-[150px] rounded-xs bg-[#b9bbbe] focus:border focus:border-[#1890FF]' tabIndex={0} />
                <div className='h-[150px] w-[150px] rounded-xs bg-[#b9bbbe] focus:border focus:border-[#1890FF]' tabIndex={0} />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer />
      </Modal.Content>
    </Modal>
  );
};
