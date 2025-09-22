'use client';
import CoinIcon from '@/assets/svg/coin.svg';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { socketAtom } from '@/modules/video/scene/store/socket';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { useAtomValue } from 'jotai';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  userId: string;
};

export const SettingsCoinsDeck: FC<Props> = ({ userId }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const socketManager = useAtomValue(socketAtom);
  const { register, handleSubmit, reset } = useForm<{ value: number }>();

  const onSubmit = (data: { value: number }) => {
    if (data.value) {
      socketManager.gameController.courage.addCoins(userId, data.value);
      reset();
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger
        onClick={onOpen}
        className='flex h-full w-[49px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] bg-[#005C2F] text-sm text-white'>
        <CoinIcon />
        <p>0 +</p>
      </Modal.Trigger>
      <Modal.Content className=''>
        <Modal.Header>Управление монетами</Modal.Header>
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-2.5'>
              <div className='flex flex-col gap-2.5'>
                <h2>Количество игровых монет</h2>
                <input
                  type='number'
                  className='h-[32px] w-[90px] rounded-xs border-2 border-[#ADC6FF] bg-[#F0F5FF] px-2 py-1 text-sm shadow-[#ADC6FF] outline-none focus:border-[#1890FF] focus:shadow-[0_0_5px]'
                  {...register('value', { required: true, valueAsNumber: true })}
                />
              </div>
              <div className='flex flex-col gap-2.5'>
                <UsersRender userId={userId} />
              </div>
            </div>
            <Modal.Footer className='flex h-full items-center justify-end sm:h-8'>
              <Button onClick={onClose} className='w-full font-normal text-[#1890FF] sm:w-fit' intent='plain'>
                Отменить
              </Button>
              <Button type='submit' className='w-full font-normal sm:w-fit' intent='primary'>
                Выдать
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

type UsersRenderProps = {
  userId: string;
};

const UsersRender: FC<UsersRenderProps> = ({ userId }) => {
  return (
    <div className='flex flex-col gap-2.5'>
      <h2 className='font-semibold'>Игрок которому будет выдана карта</h2>
      <div className='flex w-full gap-2.5'>
        <div className={`flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-[#b9bbbe]`}>{userId}</div>
      </div>
    </div>
  );
};
