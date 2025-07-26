import { PageFlow } from '@/components/layouts/page-flow';
import { PaymentDebtModal } from '@/modules/partner-balance/slices/payment-debt-modal';

export default function Home() {
  return (
    <PageFlow classNames={{ content: 'flex h-full w-full flex-col gap-8 px-[18px] py-4' }}>
      <PaymentDebtModal />
    </PageFlow>
  );
}
