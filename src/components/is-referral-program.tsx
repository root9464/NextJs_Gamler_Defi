'use client';
import { TableStatisticsModule } from '@/modules/table-statistics/module';
import { useAccount } from '@/shared/hooks/api/useAccount';
import { useTonAddress } from '@tonconnect/ui-react';
import { FC, ReactNode } from 'react';

type IsReferralProgramProps = {
  Notification: Readonly<ReactNode>;
  PartnerBalance: Readonly<ReactNode>;
};

export const IsReferralProgram: FC<IsReferralProgramProps> = ({ Notification, PartnerBalance }) => {
  const address = useTonAddress();
  const { data: account, isSuccess: isSuccessAccount } = useAccount();

  return (
    <>
      {!address && Notification}
      {PartnerBalance}
      {isSuccessAccount && account && account.referral_program_choice && <TableStatisticsModule />}
    </>
  );
};
