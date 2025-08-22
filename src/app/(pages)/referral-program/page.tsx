import { DynamicDescWorkProgram, IsReferralProgram } from '@/components/exports/exports';
import { ReferralLink } from '@/components/slices/refferal-link';

export default function TestPage() {
  return (
    <>
      <ReferralDescription />
      <IsReferralProgram Notification={<Notification />} ReferralLink={<ReferralLink />} />
    </>
  );
}

const ReferralDescription = () => (
  <div className='flex h-fit w-full flex-col gap-2.5 sm:w-[900px]'>
    <h2 className='heading-1'>Партнерская программа</h2>
    <p className='title-1'>
      Партнёрская программа — это способ получать вознаграждение за привлечение новых пользователей на платформу. Каждый зарегистрированный
      участник может стать реферером — пригласить других пользователей и получать бонусы за их активность.
    </p>
    <DynamicDescWorkProgram />
  </div>
);

const Notification = () => (
  <div className='flex flex-col gap-2.5'>
    <h2 className='heading-1'>Подключите кошелек</h2>
    <p className='title-1'>
      На этой странице будет отображен баланс вашего кошелька с валютой Gamler. Вы сможете просматривать транзакции, ваших приглашенных, погашать
      задолженности и выводить заработанные средства. Для активации полного функционала партнёрской программы подключите кошелек
    </p>
  </div>
);
