'use client';

import { useWindow } from '@/shared/hooks/useWindow';
import { cn } from '@/shared/utils/tw.utils';
import { useDisclosure } from '@hooks/useDisclosure';
import { Button } from '@ui/button';
import { Modal } from '@ui/modal';

const REFERRAL_PROGRAM_DATA = [
  {
    title: 'Как работает партнёрская система',
    content: [
      'Партнёрская программа — это способ зарабатывать, приглашая других пользователей на платформу. Каждый зарегистрированный участник получает персональную реферальную ссылку. Когда новый пользователь регистрируется по этой ссылке или указывает вас как пригласившего, вы становитесь его реферером.',
    ],
  },
  {
    title: '1. Получите свою ссылку',
    content: [
      'После регистрации в личном кабинете появится ваша персональная ссылка. Скопируйте её и отправьте друзьям, коллегам или разместите в соцсетях.',
    ],
  },
  {
    title: '2. Привлекайте рефералов',
    content: [
      'Если человек переходит по вашей ссылке или указывает ваш ник при регистрации — он становится вашим рефералом. Система учитывает как прямые, так и вторичные приглашения (2 уровень).',
    ],
  },
  {
    title: '3. Получайте бонусы',
    content: [
      'Вы получаете бонусы за действия приглашённых:',
      ['за регистрацию', 'за участие в играх', 'за покупки или активацию доступа (в зависимости от условий платформы)'],
    ],
  },
  {
    title: '4. Отслеживайте результат',
    content: [
      'В разделе «Ваши приглашённые» вы видите, кого вы пригласили, сколько бонусов получено и на каком уровне активности находятся ваши рефералы.',
    ],
  },
];

export const DescWorkProgram = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isMobile } = useWindow();
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger onClick={onOpen} className='cursor-pointer bg-transparent text-start text-[16px] font-medium text-[#1890FF] underline'>
        Как работает партнерская программа?
      </Modal.Trigger>
      <Modal.Content size={isMobile ? 'full' : 'lg'} className={cn(isMobile ? 'absolute top-0 h-full rounded-none' : 'relative rounded-2xl')}>
        <Modal.Header />
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          {REFERRAL_PROGRAM_DATA.map((item, index) => (
            <div key={index} className='flex flex-col gap-3 text-black/85'>
              <h2 className='text-base leading-6 font-medium'>{item.title}</h2>
              {item.content.map((content, i) => {
                if (Array.isArray(content)) {
                  return (
                    <ul key={i} className='list-disc pl-5 text-sm leading-[22px]'>
                      {content.map((listItem, j) => (
                        <li key={j}>{listItem}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i} className='text-sm leading-[22px]'>
                    {content}
                  </p>
                );
              })}
            </div>
          ))}
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
