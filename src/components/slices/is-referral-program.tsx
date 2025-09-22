'use client';
import { DynamicPartnerBalanceModule } from '@/modules/partner-balance/exports/exports';
import { TableStatisticsModule } from '@/modules/table-statistics/module';
import { useAccount } from '@/shared/hooks/api/useAccount';
import { useUpdateAddress } from '@/shared/hooks/api/useUpdateAddress';
import { useTonAddress } from '@tonconnect/ui-react';
import type { FC, ReactNode } from 'react';

type IsReferralProgramProps = {
  Notification: Readonly<ReactNode>;
  ReferralLink: Readonly<ReactNode>;
};

export const IsReferralProgram: FC<IsReferralProgramProps> = ({ Notification, ReferralLink }) => {
  const address = useTonAddress();
  const { data: account, isSuccess: isSuccessAccount } = useAccount();
  const hasAddress = !!address && address.trim() !== '';
  useUpdateAddress(address ?? '', account?.user_id ?? 0);

  return (
    <>
      {!address && Notification}
      <DynamicPartnerBalanceModule />
      {ReferralLink}
      {isSuccessAccount && hasAddress && account.referral_program_choice && <TableStatisticsModule />}
    </>
  );
};
