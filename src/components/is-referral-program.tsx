'use client';
import { useAccount } from '@/shared/hooks/api/useAccount';
import { EventManager } from '@/shared/lib/event.manager';
import { User } from '@/shared/types/deps';
import { useTonAddress } from '@tonconnect/ui-react';
import { FC, ReactNode, useLayoutEffect, useState } from 'react';

type IsReferralProgramProps = {
  Notification: Readonly<ReactNode>;
  PartnerBalance: Readonly<ReactNode>;
  TableStatistics: Readonly<ReactNode>;
};

export const IsReferralProgram: FC<IsReferralProgramProps> = ({ Notification, PartnerBalance, TableStatistics }) => {
  const [userAccount, setUserAccount] = useState<User | null>(null);

  useLayoutEffect(() => {
    const removeListener = EventManager.addEventListener('user-logged-in', (data: User) => {
      console.log('user-logged-in', data);
      setUserAccount(data);
    });

    return () => {
      removeListener();
    };
  }, []);

  console.log('userAccount', userAccount);

  const address = useTonAddress();
  const { data: account, isSuccess: isSuccessAccount } = useAccount(address ?? '');

  return (
    <>
      {!address && Notification}
      {PartnerBalance}
      {isSuccessAccount && account && account.referral_program_choice && TableStatistics}
    </>
  );
};
