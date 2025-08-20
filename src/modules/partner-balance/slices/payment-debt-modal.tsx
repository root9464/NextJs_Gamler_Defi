'use client';
import { useWindow } from '@/shared/hooks/useWindow';
import { cn } from '@/shared/utils/tw.utils';
import { useDisclosure } from '@hooks/useDisclosure';
import { Button } from '@ui/button';
import { Modal } from '@ui/modal';
import Image from 'next/image';

import CheckTransactionImage from '@assets/img/check-tr.png';
import PaymentDebtImage from '@assets/img/debt-table.png';
import HowToPayDebtImage from '@assets/img/how-debt.png';
import GamlerTransactionModalImage from '@assets/img/modal-tr.png';
import TelegramConfirmTransactionImage from '@assets/img/tg-confirm-tr.png';
import HelperIcon from '@assets/svg/helper-symbol.svg';

const debtInstructions = [
  {
    title: '🔽 В нижней части страницы находится таблица с перечнем всех ваших задолженностей, где вы можете увидеть сумму, дату каждой.',
    images: [PaymentDebtImage.src],
  },
  {
    title: 'Для погашение конкретной задолженности, нажмите кнопку “Погасить задолженность”',
    images: [HowToPayDebtImage.src],
  },
  {
    title: 'В ваш Telegram-кошелёк придёт уведомление для подтверждения транзакции',
    description: ['После подтверждения транзакции, задолженность будет списана с вашего баланса.'],
    images: [TelegramConfirmTransactionImage.src, GamlerTransactionModalImage.src],
  },
  {
    title: 'Нажмите “Подтвердить” транзакцию',
    description: [
      'На сайте Gamler на странице “Партнерская программа” появится модальное окно с просьбой не покидать страницу (и не обновлять ее), пока транзакция не завершится.',
      'Дождитесь, пока модальное окно скроется. Когда модальное окно скроется - погашение задолженности прошло успешно.',
    ],
  },
  {
    title: 'Если вы случайно покинули сайт, обновили страницу или модальное окно закрылось, но задолженность не исчезла:',
    list: [
      'Перейдите во вкладку «Задолженности».',
      'Нажмите кнопку «Проверить задолженность» рядом с нужной строкой.',
      'Откроется модальное окно — не закрывайте его и не покидайте страницу, пока идёт проверка.',
      'После успешной проверки и подтверждения транзакции — задолженность исчезнет из списка.',
    ],
    images: [CheckTransactionImage.src],
  },
];

export const PaymentDebtModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isMobile } = useWindow();
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger onClick={onOpen} className='cursor-pointer bg-transparent'>
        <HelperIcon />
      </Modal.Trigger>
      <Modal.Content size='xl' className={cn(isMobile ? 'absolute top-0 h-full rounded-none' : 'relative rounded-2xl')}>
        <Modal.Header />
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          <div className='flex flex-col gap-3 text-black/85'>
            {debtInstructions.map((item, index) => (
              <div key={index} className='flex flex-col gap-1'>
                <h2 className='text-base leading-6 font-bold'>{item.title}</h2>
                {item.description &&
                  item.description.map((text, i) => (
                    <p key={i} className='text-sm leading-[22px]'>
                      {text}
                    </p>
                  ))}
                {item.list && (
                  <ul className='list-inside list-disc'>
                    {item.list.map((listItem, i) => (
                      <li key={i}>{listItem}</li>
                    ))}
                  </ul>
                )}
                {item.images && (
                  <div className={item.images.length > 1 ? 'flex w-full flex-row gap-3 overflow-x-auto' : ''}>
                    {item.images.map((image, i) => (
                      <Image key={i} src={image} alt={image} width={3840} height={2160} className='h-fit w-fit' />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className='flex h-full items-center justify-end sm:h-8'>
          <Button onClick={onClose} className='w-full font-normal sm:w-fit' intent='outline'>
            Понятно
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
