'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { useAtomValue } from 'jotai';
import { usePavingRoute } from '../hook/api/usePavingRoute';
import { swapStateAtom } from '../store/swap-store';

export const SwapStats = () => {
  const swapState = useAtomValue(swapStateAtom);
  const {
    data: pavingRoute,
    isSuccess: isSuccessPavingRoute,
    isLoading: isLoadingPavingRoute,
    isError: isErrorPavingRoute,
  } = usePavingRoute(swapState.send, swapState.receive, 1);
  return (
    <div>
      <h2 className='text-sm font-medium text-black/85'>Текущий курс:</h2>
      {isSuccessPavingRoute && pavingRoute && (
        <p className='text-sm text-black/60'>
          {pavingRoute.input_amount} {pavingRoute.input_token.metadata.symbol} = {pavingRoute.output_amount.toFixed(4)}{' '}
          {pavingRoute.output_token.metadata.symbol}
        </p>
      )}
      {(isLoadingPavingRoute || isErrorPavingRoute) && <Skeleton className='h-[16px] w-[100px]' />}
    </div>
  );
};
