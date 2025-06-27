import { DescWorkProgram } from '@/components/desc-work-program';
import { PartnerBalanceModule } from '@/modules/partner-balance/module';
import { PageFlow } from '@components/layouts/page-flow';

export default function TestPage() {
  return (
    <PageFlow
      classNames={{
        content: 'flex h-full w-full flex-col gap-8 px-[18px] py-4',
      }}>
      <ReferralDescription />

      <PartnerBalanceModule />
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
