'use client';
import { useAccount } from '@/shared/hooks/api/useAccount';
import { useTonAddress } from '@tonconnect/ui-react';
import { FC, ReactNode } from 'react';

type IsReferralProgramProps = {
  Notification: Readonly<ReactNode>;
  PartnerBalance: Readonly<ReactNode>;
  TableStatistics: Readonly<ReactNode>;
};

export const IsReferralProgram: FC<IsReferralProgramProps> = ({ Notification, PartnerBalance, TableStatistics }) => {
  const userAccount = localStorage.getItem('user-logged-in');
  const address = useTonAddress();
  const { data: account, isSuccess: isSuccessAccount } = useAccount(address ?? '');

  console.log('userAccount', userAccount);

  return (
    <>
      {!address && Notification}
      {PartnerBalance}
      {isSuccessAccount && account && account.referral_program_choice && TableStatistics}
    </>
  );
};
