'use client';

import { useDisclosure } from '@hooks/useDisclosure';
import { Button } from '@ui/button';
import { Modal } from '@ui/modal';

const REFERRAL_PROGRAM_DATA = [
  {
    title: 'Как работает партнёрская система',
    content: [
      `
        Партнёрская программа — это способ зарабатывать, приглашая других пользователей на платформу.
        Каждый зарегистрированный участник получает персональную реферальную ссылку.
        Когда новый пользователь регистрируется по этой ссылке или указывает вас как пригласившего, вы становитесь его реферером.
      `,
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
      'Gamler — это платформа, где можно зарабатывать не только за игру или проведение игр, но и за приглашение других участников.',
      {
        type: 'list',
        title: 'Вы можете пригласить:',
        items: ['🎲 Игроков', '🎙 Ведущих', '🛠 Авторов игр'],
      },
      `
        Если приглашённый начинает действовать — вы начинаете зарабатывать. Но если человек ничего не делает — вы тоже ничего не получаете.
        Здесь поощряются реальные действия, а не просто количество приглашённых.
        Даже если приглашённый вами не активен, но он привёл кого-то, кто стал активен — вы всё равно получаете долю. Потому что без вас этой цепочки бы не было
      `,
    ],
  },
  {
    title: '3. Получайте бонусы',
    content: [
      {
        type: 'list',
        title: 'Бонусы начисляются, если приглашённые вами участники:',
        items: ['проходят регистрацию', 'участвуют в играх', 'покупают или активируют доступ (в зависимости от условий платформы)'],
      },
      '✅ Бонусы идут за действия — а не просто за регистрацию. Вы получаете доход в 2 уровня: от ваших личных приглашённых и от тех, кого они сами пригласили.',
    ],
  },
  {
    title: 'А кто платит бонусы?',
    content: [
      `
        — Тот, кто получил прибыль от продажи билета.Если вы провели игру и продали билет — вы делитесь частью дохода.Если вы ничего не продали — вы ничего не платите.
        Ваш доход — это благодарность от системы.Если вы кого-то привели, и этот кто-то заработал — вы получаете бонус без обязательств.
      `,
    ],
  },
  {
    title: '4. Отслеживайте результат',
    content: [
      {
        type: 'list',
        title: 'Во вкладке «Ваши приглашённые» вы можете:',
        items: ['видеть, кого вы пригласили', 'сколько бонусов вы заработали', 'кто из приглашённых активен и на каком уровне'],
      },
      '❗Если вы ещё не подключили партнёрскую программу — не переживайте: все приглашённые вами сохраняются за вами, и как только вы подключитесь — бонусы начнут начисляться.',
    ],
  },
];

export const DescWorkProgram = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger onClick={onOpen} className='cursor-pointer bg-transparent text-start text-[16px] font-medium text-[#1890FF] underline'>
        Как работает партнерская программа?
      </Modal.Trigger>
      <Modal.Content className=''>
        <Modal.Header />
        <Modal.Body className='flex flex-col gap-3 border-t border-b border-black/10 pt-[22px] pb-[17px]'>
          {REFERRAL_PROGRAM_DATA.map((item, index) => (
            <div key={index} className='flex flex-col gap-3 text-black/85'>
              <h2 className='text-base leading-6 font-bold'>{item.title}</h2>
              {item.content.map((content, i) =>
                typeof content === 'string' ? (
                  <p key={i} className='text-sm leading-[22px]'>
                    {content}
                  </p>
                ) : content.type === 'list' ? (
                  <>
                    <h3 className='text-sm leading-[22px]'>{content.title}</h3>
                    <ul key={i} className='list-disc pl-5 text-sm leading-[22px]'>
                      {content.items.map((listItem, j) => (
                        <li key={j}>{listItem}</li>
                      ))}
                    </ul>
                  </>
                ) : null,
              )}
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
