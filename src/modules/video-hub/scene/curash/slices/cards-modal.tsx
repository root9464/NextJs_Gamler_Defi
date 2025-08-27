import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import CardsIco from '@assets/svg/cardhub.svg';

export const CardsModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger
        onClick={onOpen}
        className='flex h-[36px] w-[26px] cursor-pointer items-center justify-center rounded-[3px] bg-linear-to-r from-[#BDC3C7] to-[#FFFFFF]'>
        <CardsIco />
      </Modal.Trigger>
      <Modal.Content className=''>
        <Modal.Header>Карты игрока</Modal.Header>
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          <div className='flex flex-col gap-5'>
            <UsersRender />
            <Curash />
            <Saller />
          </div>
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

const UsersRender = () => {
  return (
    <div className='flex flex-col gap-2.5'>
      <h2 className='font-semibold'>Выберите игрока</h2>
      <div className='flex w-full gap-2.5'>
        <div className='h-[50px] w-[50px] rounded-full bg-[#b9bbbe] focus:border-2 focus:border-[#3c3e3f]' tabIndex={0} />
        <div className='h-[50px] w-[50px] rounded-full bg-[#b9bbbe] focus:border-2 focus:border-[#3c3e3f]' tabIndex={0} />
        <div className='h-[50px] w-[50px] rounded-full bg-[#b9bbbe] focus:border-2 focus:border-[#3c3e3f]' tabIndex={0} />
      </div>
    </div>
  );
};

const Curash = () => {
  return (
    <div className='flex flex-col gap-2.5'>
      <h2 className='font-semibold'>Кураж продаж</h2>
      <div className='flex w-full gap-2.5'>
        <div className='h-[150px] w-[150px] rounded-[6px] bg-blue-500 focus:border-2 focus:border-[#3c3e3f]' tabIndex={0}></div>
        <div className='h-[150px] w-[150px] rounded-[6px] bg-blue-500 focus:border-2 focus:border-[#3c3e3f]' tabIndex={0}></div>
        <div className='h-[150px] w-[150px] rounded-[6px] bg-blue-500 focus:border-2 focus:border-[#3c3e3f]' tabIndex={0}></div>
      </div>
    </div>
  );
};

const Saller = () => {
  return (
    <div className='flex flex-col gap-2.5'>
      <h2 className='font-semibold'>Инструменты успешного продавца</h2>
      <div className='flex w-full gap-2.5'>
        <div className='bg-epta h-[150px] w-[150px] rounded-[6px] focus:border-2 focus:border-[#3c3e3f]' tabIndex={0}></div>
        <div className='bg-epta h-[150px] w-[150px] rounded-[6px] focus:border-2 focus:border-[#3c3e3f]' tabIndex={0}></div>
      </div>
    </div>
  );
};
