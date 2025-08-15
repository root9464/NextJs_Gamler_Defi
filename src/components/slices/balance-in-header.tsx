import { useTonAddress } from '@tonconnect/ui-react';

import { useJettonWallet } from '@/shared/hooks/api/useJettonWallet';
import { DynamicWalletConnectButton } from '../exports/exports';
import { Skeleton } from '../ui/skeleton';

export const BalanceInHeader = () => {
  const address = useTonAddress();

  const {
    data: jettonWallets,
    isLoading: isLoadingJettonWallets,
    isError: isErrorJettonWallets,
    isSuccess: isSuccessJettonWallets,
  } = useJettonWallet({ address: address ?? '' });
  const jettonWallet = jettonWallets?.balances.find((balance) => balance.jetton.symbol === 'GMLR');

  return (
    <div className='flex h-full w-fit flex-row items-center justify-end gap-2.5 sm:ml-0 sm:w-full'>
      <DynamicWalletConnectButton />
      {isSuccessJettonWallets && jettonWallet && (
        <p className='text-sm font-bold'>{(Number(jettonWallet?.balance) / 10 ** jettonWallet?.jetton.decimals).toFixed(2)} Gamler</p>
      )}
      {isSuccessJettonWallets && !jettonWallet && <p className='text-base font-bold'>0 Gamler</p>}
      {(isLoadingJettonWallets || isErrorJettonWallets) && <Skeleton className='h-8 w-[100px]' />}
    </div>
  );
};
