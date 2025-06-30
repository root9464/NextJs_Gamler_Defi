import { PageFlow } from '@components/layouts/page-flow';
import { DescWorkProgram } from '@components/slices/desc-work-program';
import { IsReferralProgram } from '@components/slices/is-referral-program';
import { PartnerBalanceModule } from '@modules/partner-balance/module';

export default function TestPage() {
  return (
    <PageFlow
      classNames={{
        content: 'flex h-full w-full flex-col gap-8 px-[18px] py-4',
      }}>
      <ReferralDescription />
      <IsReferralProgram Notification={<Notification />} PartnerBalance={<PartnerBalanceModule />} />
    </PageFlow>
  );
}

const ReferralDescription = () => (
  <div className='flex h-fit w-[900px] flex-col gap-2.5'>
    <h2 className='heading-1'>Партнерская программа</h2>
    <p className='title-1'>
      Партнёрская программа — это способ получать вознаграждение за привлечение новых пользователей на платформу. Каждый зарегистрированный{' '}
      участник может стать реферером — пригласить других пользователей и получать бонусы за их активность.
    </p>

    <DescWorkProgram />
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
