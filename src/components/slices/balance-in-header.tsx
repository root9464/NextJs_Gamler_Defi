import { useTonAddress } from '@tonconnect/ui-react';
import { usePathname } from 'next/navigation';

import { useJettonWallet } from '@/shared/hooks/api/useJettonWallet';
import Logo from '@assets/svg/logo.svg';
import LogoWithoutText from '@assets/svg/logo2.svg';
import { Skeleton } from '../ui/skeleton';

type BalanceInHeaderProps = {
  excludedPaths: string[];
};

export const BalanceInHeader = ({ excludedPaths }: BalanceInHeaderProps) => {
  const address = useTonAddress();
  const pathname = usePathname();

  const {
    data: jettonWallets,
    isLoading: isLoadingJettonWallets,
    isError: isErrorJettonWallets,
    isSuccess: isSuccessJettonWallets,
  } = useJettonWallet({ address: address ?? '' });
  const jettonWallet = jettonWallets?.balances.find((balance) => balance.jetton.symbol === 'GMLR');

  return (
    <>
      {!excludedPaths.includes(pathname) ? (
        <Logo />
      ) : (
        <div className='flex h-full w-fit flex-row items-center justify-end gap-2.5 sm:ml-0 sm:w-full'>
          <LogoWithoutText className='size-8' />
          {isSuccessJettonWallets && jettonWallet && (
            <p className='text-base font-bold'>{(Number(jettonWallet?.balance) / 10 ** jettonWallet?.jetton.decimals).toFixed(2)} Gamler</p>
          )}
          {isSuccessJettonWallets && !jettonWallet && <p className='text-base font-bold'>0 Gamler</p>}
          {(isLoadingJettonWallets || isErrorJettonWallets) && <Skeleton className='h-8 w-[100px]' />}
        </div>
      )}
    </>
  );
};
