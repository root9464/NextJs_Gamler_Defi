'use client';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { Timer } from '../slices/timer';

export const ChangeTimer = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger onClick={onOpen}>
        <Timer />
      </Modal.Trigger>
      <Modal.Content className=''>
        <Modal.Header>Изменить игровое время</Modal.Header>
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          <div className='flex flex-col gap-2.5'>
            <div className='flex flex-col gap-2.5'>
              <h2>Таймер игрового времени ( мин )</h2>
              <input
                type='number'
                className='h-[32px] w-[90px] rounded-xs border-2 border-[#ADC6FF] bg-[#F0F5FF] px-2 py-1 text-sm shadow-[#ADC6FF] outline-none focus:border-[#1890FF] focus:shadow-[0_0_5px]'
              />
            </div>
            <div className='flex flex-col gap-2.5'>
              <h2>Таймер хода игрока ( мин )</h2>
              <input
                type='number'
                className='h-[32px] w-[90px] rounded-xs border-2 border-[#ADC6FF] bg-[#F0F5FF] px-2 py-1 text-sm shadow-[#ADC6FF] outline-none focus:border-[#1890FF] focus:shadow-[0_0_5px]'
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='flex h-full items-center justify-end sm:h-8'>
          <Button onClick={onClose} className='w-full font-normal text-[#1890FF] sm:w-fit' intent='plain'>
            Отменить
          </Button>
          <Button onClick={onClose} className='w-full font-normal sm:w-fit' intent='primary'>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
