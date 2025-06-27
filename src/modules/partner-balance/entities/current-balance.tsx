'use client';
import HelperIcon from '@/assets/svg/helper-symbol.svg';
import { Button } from '@/components/ui/button';
import { useJettonWallet } from '@/shared/hooks/api/useJettonWallet';
import { useTonAddress } from '@tonconnect/ui-react';

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
    <div className='flex flex-row items-center justify-between gap-5'>
      <div className='flex flex-col items-center justify-center gap-2.5'>
        <p className='text-sm text-black/85'>Текущий баланс</p>
        {isSuccessJettonWallets && jettonWallet && (
          <p className='text-lg font-bold text-black/85'>
            {(Number(jettonWallet?.balance) / 10 ** jettonWallet?.jetton.decimals).toFixed(2)} Gamler
          </p>
        )}
        {isLoadingJettonWallets && <p className='text-lg font-bold text-black/85'>Загрузка...</p>}
        {isErrorJettonWallets && <p className='text-lg font-bold text-black/85'>Ошибка загрузки баланса</p>}
        {!address && !jettonWallet && <p className='text-lg font-bold text-black/85'>0 Gamler</p>}
      </div>
      <div className='flex flex-row items-center gap-2.5'>
        <Button intent='outline' size='sm'>
          Вывести
        </Button>
        <HelperIcon />
      </div>
    </div>
  );
};
