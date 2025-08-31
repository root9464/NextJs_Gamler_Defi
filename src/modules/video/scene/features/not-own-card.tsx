'use client';
import { Button, buttonStyles } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { cn } from '@/shared/utils/tw.utils';
import { useAtomValue } from 'jotai';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import type { FC } from 'react';

type CardsProps = {
  id: string;
  img: StaticImageData;
};

export const NotOwn: FC<CardsProps> = ({ id, img }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const socketManager = useAtomValue(socketAtom);

  const EveryOneShow = (id: string) => {
    socketManager.gameController.showEveryoneCard(id);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger
        onClick={onOpen}
        className='flex h-full w-[49px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] border border-white'>
        <Image src={img} alt='not found' />
      </Modal.Trigger>
      <Modal.Content className=''>
        <Modal.Header />
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          <Image src={img} alt='not found' />
          <div className='flex'>
            <Button className={cn(buttonStyles({ intent: 'primary', size: 'sm' }))} onClick={() => EveryOneShow(id)}>
              Показать
            </Button>
            <Button className={cn(buttonStyles({ intent: 'primary', size: 'sm' }))}>Передать</Button>
            <Button className='w-full font-normal sm:w-fit' intent='primary'>
              Вернуть в колоду
            </Button>
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
