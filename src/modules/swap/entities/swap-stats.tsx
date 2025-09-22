'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { useDollarRate } from '@/shared/hooks/api/useDollarRate';
import { useAtomValue } from 'jotai';
import { isSwapRouteEmpty } from '../helpers/helpers';
import { usePavingRoute } from '../hook/api/usePavingRoute';
import { swapRouteAtom } from '../store/swap-route';
import { swapStateAtom } from '../store/swap-store';

export const SwapStats = () => {
  const swapState = useAtomValue(swapStateAtom);
  const swapRoute = useAtomValue(swapRouteAtom);

  const {
    data: pavingRoute,
    isSuccess: isSuccessPavingRoute,
    isLoading: isLoadingPavingRoute,
    isError: isErrorPavingRoute,
  } = usePavingRoute(swapState.send, swapState.receive, 1);
  const { data: dollarRate, isSuccess: isSuccessDollarRate } = useDollarRate();

  const isEmpty = isSwapRouteEmpty(swapRoute);

  return (
    <div>
      <div className='flex flex-row gap-1'>
        <h2 className='text-sm font-medium text-black/85'>Текущий курс:</h2>
        {isSuccessPavingRoute && pavingRoute && (
          <p className='text-sm text-black/60'>
            {pavingRoute.input_amount} {pavingRoute.input_token.metadata.symbol} = {pavingRoute.output_amount.toFixed(4)}{' '}
            {pavingRoute.output_token.metadata.symbol}
          </p>
        )}
        {(isLoadingPavingRoute || isErrorPavingRoute) && <Skeleton className='h-[16px] w-[100px]' />}
      </div>
      <div className='flex flex-row gap-1'>
        <h2 className='text-sm font-medium text-black/85'>Вы получите:</h2>
        {!isEmpty && swapRoute && isSuccessDollarRate && (
          <p className='text-sm text-black/60'>
            {swapRoute.output_usd.toFixed(2)} Долларов ≈ {(swapRoute.output_usd * dollarRate.rub).toFixed(2)} Рублей
          </p>
        )}
      </div>
    </div>
  );
};
