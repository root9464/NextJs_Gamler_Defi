'use client';
import { useAccount } from '@/shared/hooks/api/useAccount';
import { EventManager } from '@/shared/lib/event.manager';
import { User } from '@/shared/types/deps';
import { useTonAddress } from '@tonconnect/ui-react';
import { FC, ReactNode, useEffect, useState } from 'react';

type IsReferralProgramProps = {
  Notification: Readonly<ReactNode>;
  PartnerBalance: Readonly<ReactNode>;
  TableStatistics: Readonly<ReactNode>;
};

export const IsReferralProgram: FC<IsReferralProgramProps> = ({ Notification, PartnerBalance, TableStatistics }) => {
  const [userAccount, setUserAccount] = useState<User | null>(null);
  const address = useTonAddress();
  const { data: account, isSuccess: isSuccessAccount } = useAccount(address ?? '');

  useEffect(() => {
    const cachedUser = EventManager.getEventInCache<User>('user-logged-in');
    if (cachedUser) {
      setUserAccount(cachedUser);
    }

    const removeListener = EventManager.addEventListener('user-logged-in', (data: User) => {
      setUserAccount(data);
    });

    return () => {
      removeListener();
    };
  }, []);

  console.log('userAccount', userAccount);

  return (
    <>
      {!address && Notification}
      {PartnerBalance}
      {isSuccessAccount && account && account.referral_program_choice && TableStatistics}
    </>
  );
};
