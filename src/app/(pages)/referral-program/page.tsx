import { DynamicDescWorkProgram, IsReferralProgram } from '@/components/exports/exports';
import { ReferralLink } from '@/components/slices/refferal-link';
import { PageFlow } from '@components/layouts/page-flow';

export default function TestPage() {
  return (
    <PageFlow
      classNames={{
        content: 'flex max-h-[calc(100vh-64px)] w-full flex-col gap-8 py-4 px-[30px] md:pl-6 md:pr-[60px]',
      }}>
      <ReferralDescription />
      <IsReferralProgram Notification={<Notification />} ReferralLink={<ReferralLink />} />
    </PageFlow>
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
