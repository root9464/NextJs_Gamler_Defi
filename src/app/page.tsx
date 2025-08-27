'use client';
import { PaymentDebtModal } from '@/modules/partner-balance/slices/payment-debt-modal';
import { ChangeAcceptance } from '@/modules/video-hub/lobby/features/change-acceptance';

export default function Home() {
  return (
    <>
      <h1>main page</h1>
      <PaymentDebtModal />
      <ChangeAcceptance />
    </>
  );
}
