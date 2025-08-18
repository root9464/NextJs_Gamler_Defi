'use client';
import { Tooltip } from '@/components/ui/tooltip';
import { useAccount } from '@/shared/hooks/api/useAccount';
import { useJettonWallet } from '@/shared/hooks/api/useJettonWallet';
import HelperIcon from '@assets/svg/helper-symbol.svg';
import { useTonAddress } from '@tonconnect/ui-react';
import { buttonStyles } from '@ui/button';
import { Skeleton } from '@ui/skeleton';
import Link from 'next/link';
import { useDebt } from '../hooks/api/usePaymentStats';

export const CurrentBalance = () => {
  const address = useTonAddress();
  const {
    data: jettonWallets,
    isLoading: isLoadingJettonWallets,
    isError: isErrorJettonWallets,
    isSuccess: isSuccessJettonWallets,
  } = useJettonWallet({ address: address! });
  const jettonWallet = jettonWallets?.balances.find((balance) => balance.jetton.symbol === 'GMLR');

  const { data: account } = useAccount();
  const { data: debt, isLoading: isLoadingDebt } = useDebt(account?.user_id ?? 0);

  const isDebt = !isLoadingDebt && debt !== undefined && debt > 0;
  return (
    <div className='grid w-full grid-cols-[130px_auto] place-content-stretch gap-5 sm:flex sm:w-fit sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex flex-col items-start justify-center gap-2.5 sm:items-center'>
        <p className='text-sm text-black/85'>Текущий баланс</p>
        {isSuccessJettonWallets && jettonWallet && (
          <p className='text-lg font-bold text-black/85'>
            {(Number(jettonWallet?.balance) / 10 ** jettonWallet?.jetton.decimals).toFixed(2)} Gamler
          </p>
        )}
        {isSuccessJettonWallets && !jettonWallet && <p className='text-lg font-bold text-black/85'>0 Gamler</p>}
        {(isLoadingJettonWallets || isErrorJettonWallets) && <Skeleton className='h-9 w-[140px]' />}
        {!address && !jettonWallet && <p className='text-lg font-bold text-black/85'>0 Gamler</p>}
      </div>
      <div className='flex flex-row items-center justify-end gap-2.5'>
        <Tooltip isDisabled={!isDebt}>
          <Tooltip.Trigger>
            <Link className={buttonStyles({ intent: 'outline', size: 'sm', isDisabled: isDebt })} href='/web3/exchanger'>
              Вывести
            </Link>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <p className='text-muted-fg mt-1 max-w-2xs text-sm text-pretty'>
              Прежде чем вывести свои токены, пожалуйста, сначала оплатите долг.
            </p>
          </Tooltip.Content>
        </Tooltip>
        <HelperIcon />
      </div>
    </div>
  );
};
