import ExitIco from '@/assets/svg/exit.svg';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useDisclosure } from '@/shared/hooks/useDisclosure';

export const EndCard = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger onClick={onOpen} className='flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-[40px] bg-[#FF4343]'>
        <ExitIco />
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header />
        <Modal.Body className='flex flex-col gap-3 pt-[22px] pb-[17px] text-center'>
          <h1 className='font-semibold'>Вы уверены, что хотите завершить игру для всех участников?</h1>
          <p>Игроки и Вы больше не сможете вернуться в сессию и возобновить игру</p>
        </Modal.Body>
        <Modal.Footer className='flex h-full items-center justify-end sm:h-8'>
          <Button onClick={onClose} className='w-full font-normal text-red-500 hover:text-[#1890FF] sm:w-fit' intent='plain'>
            Выйти
          </Button>
          <Button onClick={onClose} className='w-full font-normal sm:w-fit' intent='primary'>
            Остаться
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
