'use client';
import ConnectMethodImage from '@assets/img/connect-method.png';
import ConnectWalletButtonImage from '@assets/img/connect-wallet-button.png';
import TelegramConnectModalsImages from '@assets/img/tg-connect-wallet-modals.png';
import TelegramWalletAgreementImage from '@assets/img/tg-wallet-agreement.png';
import TelegramWalletConnectImage from '@assets/img/tg-wallet-connect-madal.jpg';
import TelegramWalletConnectImage2 from '@assets/img/tg-wallet-connect.png';
import TelegramWalletCheckSeedsImage from '@assets/img/tg-wallet-seeds-check.png';
import TelegramWalletSeedsImage from '@assets/img/tg-wallet-seeds.png';
import TelegramWlletStartImage from '@assets/img/tg-wallet-start.png';
import TelegramWalletTabsImage from '@assets/img/tg-wallet-tabs.png';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { progressAtom } from '../store/progress';

const MANUAL_ITEMS = [
  {
    id: 1,
    title: 'На странице “Партнерская программа” нажмите кнопку “Подключить кошелек”',
    images: [ConnectWalletButtonImage],
  },
  {
    id: 2,
    title: 'В открывшемся окне нажмите Wallet in Telegram',
    description: '📍 Важно: подключение идёт через Telegram-бота.',
    images: [TelegramWalletConnectImage],
  },
  {
    id: 3,
    title: 'Выберите удобный способ подключения кошелька',
    description: `
      Если вы подключаетесь с телефона — просто отсканируйте появившийся QR-код.
      Если используете Telegram на компьютере — нажмите кнопку «Открыть приложение», чтобы продолжить подключение в Telegram.
    `,
    images: [ConnectMethodImage],
  },
  {
    id: 4,
    title: 'При первом подключении кошелька в Telegram появится модальное окно с просьбой принять условия.',
    description: '☑️ Отметьте чек-бокс «Я принимаю условия» и нажмите кнопку «ОК»',
    images: [TelegramWalletAgreementImage],
  },
  {
    id: 5,
    title: 'Переключитесь на TON в Telegram-кошельке',
    description:
      'После подтверждения условий откроется ваш криптокошелёк в Telegram.Наверху выберите вкладку TON (она может быть подписана как “TON” или “Toncoin”).',
    images: [TelegramWalletTabsImage],
  },
  {
    id: 6,
    title: 'Начните создание кошелька',
    description:
      'В открывшемся окне нажмите кнопку «Начать».Затем выберите «Создать новый кошелёк» — это запустит процесс создания TON-кошелька.',
    images: [TelegramWlletStartImage],
  },
  {
    id: 7,
    title: 'Сохраните секретные слова для входа в кошелёк',
    description: `
    Выберите удобный способ входа в кошелёк. В примере используется второй способ — вручную.
    На экране появится список слов (Seed-фраза) — это ваш ключ к кошельку.
    📝 Обязательно сохраните слова в надёжном месте — они понадобятся для входа в кошелёк или восстановления доступа.
    `,
    images: [TelegramWalletSeedsImage],
  },
  {
    id: 8,
    title: 'Подтвердите секретные слова и откройте кошелёк',
    description: `
      На следующем экране вам нужно ввести слова из списка, который вы сохранили ранее. 
      Введите их в нужном порядке, как было показано.
      Затем нажмите: ▶️ «Далее» ▶️ «Открыть TON кошелёк».`,
    images: [TelegramWalletCheckSeedsImage],
  },
  {
    id: 9,
    title: '🎉Ура! Кошелёк создан — подключаем к платформе',
    description: `
      Поздравляем! Вы успешно создали свой первый TON-кошелёк в Telegram.
      Теперь вы можете проводить транзакции и зарабатывать на платформе Gamler.
      Остался последний шаг: 🔁 Вернитесь на платформу и нажмите кнопку «Подключить кошелёк» ещё раз.
    `,
    images: [ConnectWalletButtonImage],
  },
  {
    id: 10,
    title: 'Подтвердите подключение кошелька',
    description: `
      В появившемся окне внизу нажмите первую кнопку «Wallet in Telegram» — это откроет Telegram и свяжет ваш кошелёк с платформой Gamler.
      Если вы подключаетесь с телефона, отсканируйте QR-код, который появится.
      Если удобнее работать с Telegram на компьютере — нажмите кнопку «Открыть приложение».
    `,
    images: [TelegramConnectModalsImages],
  },
  {
    id: 11,
    title: 'Подтвердите связь кошелька и платформы',
    description: `
      В вашем Telegram-кошельке появится окно с запросом подтверждения.
      Нажмите кнопку «Подключить», чтобы завершить процесс.
      Готово! Теперь ваш Telegram-кошелёк успешно связан с платформой Gamler. Вы можете использовать его для транзакций, обменов и получения вознаграждений.
    `,
    images: [TelegramWalletConnectImage2],
  },
];

export const ManualBlock = () => {
  const currentStepState = useAtomValue(progressAtom);
  const currentStep = MANUAL_ITEMS[currentStepState.step];
  return (
    <div className='flex h-[630px] w-full shrink flex-col gap-2.5 text-black/85'>
      {currentStep && (
        <>
          <h2 className='text-lg font-semibold'>{currentStep.title}</h2>
          <p className='text-sm text-black/60'>{currentStep.description}</p>
          <div className='h-full w-full overflow-x-scroll'>
            {currentStep.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                width={image.width}
                height={image.height}
                alt={currentStep.title}
                className='h-[500px] w-auto object-contain'
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
