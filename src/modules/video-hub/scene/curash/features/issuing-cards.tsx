import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import PlusIco from '@assets/svg/plus.svg';

const deck = [
  { name: 'Кураж продаж (52 карт)' },
  { name: 'Инструменты успешного продавца (52 карт)' },
  { name: 'Новичок (54 карт)' },
  { name: 'Продавец (36 карт)' },
  { name: 'Руководитель продаж (24 карт)' },
  { name: 'Пожелания от игры до руководителя (10 карт)' },
  { name: 'Пожелания от игры после руководителя (10 карт)' },
];

export const IssuingCards = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger
        onClick={onOpen}
        className='flex h-[36px] w-[26px] cursor-pointer items-center justify-center rounded-[3px] bg-linear-to-r from-[#BDC3C7] to-[#FFFFFF]'>
        <PlusIco />
      </Modal.Trigger>
      <Modal.Content className=''>
        <Modal.Header>Выдача карт игрокам</Modal.Header>
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-[10px]'>
              <h2 className='font-semibold'>Выберите колоду</h2>
              {deck.map(({ name }) => (
                <div className='group flex cursor-pointer items-center gap-[10px]' tabIndex={0}>
                  <div className='relative flex items-center justify-center'>
                    <input
                      type='checkbox'
                      className='h-4 w-4 appearance-none rounded-full border border-black group-hover:border-[#1890FF] group-focus:border-[#1890FF]'
                    />
                    <div className='absolute hidden h-2 w-2 rounded-full bg-[#1890FF] group-focus:block' />
                  </div>
                  <p>{name}</p>
                </div>
              ))}
            </div>
            <div className='flex flex-col gap-[10px]'>
              <h2 className='font-semibold'>Выберите игрока, которому будет выдана карта</h2>
              <div className='flex w-full gap-[10px]'>
                <div className='h-[50px] w-[50px] rounded-full bg-[#b9bbbe] focus:border focus:border-[#1890FF]' tabIndex={0} />
                <div className='h-[50px] w-[50px] rounded-full bg-[#b9bbbe] focus:border focus:border-[#1890FF]' tabIndex={0} />
                <div className='h-[50px] w-[50px] rounded-full bg-[#b9bbbe] focus:border focus:border-[#1890FF]' tabIndex={0} />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='flex h-full items-center justify-end sm:h-8'>
          <Button onClick={onClose} className='w-full font-normal text-red-500 sm:w-fit' intent='plain'>
            Отмена
          </Button>
          <Button onClick={onClose} className='w-full font-normal sm:w-fit' intent='primary'>
            Выдать карту
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
