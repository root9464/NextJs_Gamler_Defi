'use client';
import { Loading } from '@/components/slices/loading';
import { Modal } from '@/components/ui/modal';
import type { BaseDisclosureProps } from '@/shared/hooks/useDisclosure';
import type { FC } from 'react';

export const PayModal: FC<Pick<BaseDisclosureProps, 'isOpen'>> = ({ isOpen }) => (
  <Modal isOpen={isOpen}>
    <Modal.Content
      size='lg'
      className='absolute top-0 max-h-[297px] max-w-[620px] rounded-none sm:relative sm:rounded-2xl'
      closeButton={false}
      isDismissable={false}>
      <Modal.Header className='h-12 p-0' />
      <Modal.Body className='flex flex-col items-center gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
        <Loading />
        <div className='flex flex-col gap-3 text-center'>
          <h2 className='heading-1'>❗ Не покидайте страницу</h2>
          <p className='text-sm'>Идет обработка вашей транзакции. Если вы закроете страницу сейчас, платеж может не завершиться.</p>
        </div>
      </Modal.Body>
    </Modal.Content>
  </Modal>
);
