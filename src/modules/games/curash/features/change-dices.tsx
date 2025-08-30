'use client';
import ChangeIco from '@/assets/svg/change.svg';
import DiceIco from '@/assets/svg/dice.svg';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { useAtomValue } from 'jotai';

const deck = [
  { id: 1, name: '6', desc: '1 кубик в игре', diceCount: 1, facesCount: 6 },
  { id: 2, name: '6 + 6', desc: '2 кубик в игре', diceCount: 2, facesCount: 6 },
  { id: 3, name: '6 + 6 + 6', desc: '3 кубик в игре', diceCount: 3, facesCount: 6 },
  { id: 4, name: '6 + 6 + 6 + 6', desc: '4 кубик в игре', diceCount: 4, facesCount: 6 },
];

export const ChangeDices = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const socketManager = useAtomValue(socketAtom);

  const onChangeDice = (diceCount: number, facesCount: number) => {
    socketManager.changeDice(diceCount, facesCount);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger onClick={onOpen} className='flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-[#1890FF]'>
        <ChangeIco className='fill-white' />
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>Управление кубиком</Modal.Header>
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          <div className='flex flex-col gap-2.5'>
            <h2 className='font-semibold'>Выберите комбинацию броска кубика для игроков</h2>
            {deck.map(({ name, desc, id, diceCount, facesCount }) => (
              <div
                className='group flex cursor-pointer items-center gap-[30px]'
                tabIndex={0}
                key={id}
                onClick={() => onChangeDice(diceCount, facesCount)}>
                <div className='flex w-28 items-center gap-1'>
                  <div className='relative flex items-center justify-center'>
                    <input
                      type='checkbox'
                      className='h-4 w-4 appearance-none rounded-full border border-black group-hover:border-[#1890FF] group-focus:border-[#1890FF]'
                    />
                    <div className='absolute hidden h-2 w-2 rounded-full bg-[#1890FF] group-focus:block' />
                  </div>
                  <p>{name}</p>
                </div>
                <div className='flex gap-2.5'>
                  <DiceIco className='h-[23px] w-[20px]' />
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className='flex h-full items-center justify-end sm:h-8'>
          <Button onClick={onClose} className='w-full font-normal text-red-500 sm:w-fit' intent='plain'>
            Отмена
          </Button>
          <Button onClick={onClose} className='w-full font-normal sm:w-fit' intent='primary'>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
