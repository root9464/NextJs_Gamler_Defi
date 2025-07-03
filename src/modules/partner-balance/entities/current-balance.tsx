'use client';
import { useJettonWallet } from '@/shared/hooks/api/useJettonWallet';
import HelperIcon from '@assets/svg/helper-symbol.svg';
import { useTonAddress } from '@tonconnect/ui-react';
import { Button } from '@ui/button';
import { Skeleton } from '@ui/skeleton';

export const CurrentBalance = () => {
  const address = useTonAddress();
  const {
    data: jettonWallets,
    isLoading: isLoadingJettonWallets,
    isError: isErrorJettonWallets,
    isSuccess: isSuccessJettonWallets,
  } = useJettonWallet({ address: address! });
  const jettonWallet = jettonWallets?.balances.find((balance) => balance.jetton.symbol === 'GMLR');

  return (
    <div className='grid w-full grid-cols-[130px_auto] place-content-stretch gap-5 sm:flex sm:w-fit sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex flex-col items-start justify-center gap-2.5 sm:items-center'>
        <p className='text-sm text-black/85'>Текущий баланс</p>
        {isSuccessJettonWallets && jettonWallet && (
          <p className='text-lg font-bold text-black/85'>
            {(Number(jettonWallet?.balance) / 10 ** jettonWallet?.jetton.decimals).toFixed(2)} Gamler
          </p>
        )}
        {isLoadingJettonWallets && <Skeleton className='h-9 w-[140px]' />}
        {isErrorJettonWallets && <p className='text-lg font-bold text-black/85'>Ошибка загрузки баланса</p>}
        {!address && !jettonWallet && <p className='text-lg font-bold text-black/85'>0 Gamler</p>}
      </div>
      <div className='flex flex-row items-center justify-end gap-2.5'>
        <Button intent='outline' size='sm'>
          Вывести
        </Button>
        <HelperIcon />
      </div>
    </div>
  );
};
