/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { SendTransactionRequest } from '@tonconnect/ui-react';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { getDistributionRoute } from '../helpers/helpers';
import { usePavingRoute } from '../hook/api/usePavingRoute';
import { useSwap } from '../hook/api/useSwap';
import { resetSwapRouteAtom, swapRouteAtom } from '../store/swap-route';
import { swapStateAtom } from '../store/swap-store';

export const SwapButton = () => {
  const swapState = useAtomValue(swapStateAtom);
  const [_, setSwapRoute] = useAtom(swapRouteAtom);
  const [, resetSwapRoute] = useAtom(resetSwapRouteAtom);

  const address = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const { data: pavingRoute, isSuccess: isSuccessPavingRoute } = usePavingRoute(swapState.send, swapState.receive, swapState.amount);

  const { pathData } = getDistributionRoute(pavingRoute?.paths ?? []);
  const {
    data: cellSwap,
    isSuccess: isSuccessCellSwap,
    isLoading: isLoadingCellSwap,
    isError: isErrorCellSwap,
  } = useSwap(pathData.paths, 0.5, address ?? '');

  const transaction = async () => {
    if (!isSuccessCellSwap || cellSwap.transactions.length <= 0) return;
    const message: SendTransactionRequest = {
      validUntil: Math.floor(Date.now() / 1000) + 60,
      messages: cellSwap.transactions.map((cell) => ({
        address: cell.address,
        amount: cell.value,
        payload: cell.cell,
      })),
    };

    await tonConnectUI.sendTransaction(message);
    resetSwapRoute();
  };

  useEffect(() => {
    if (!isSuccessCellSwap || !isSuccessPavingRoute) return;
    setSwapRoute({
      ...pavingRoute,
    });
  }, [isSuccessCellSwap, isSuccessPavingRoute, pavingRoute, setSwapRoute]);

  return (
    <>
      {isSuccessCellSwap && cellSwap.transactions.length > 0 && (
        <Button intent='primary' onClick={transaction} className='h-9 w-[107px]'>
          Обменять
        </Button>
      )}
      {(isLoadingCellSwap || isErrorCellSwap) && <Skeleton className='h-9 w-[107px]' />}
    </>
  );
};
