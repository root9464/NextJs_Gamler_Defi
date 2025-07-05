'use client';
import HelperIcon from '@assets/svg/helper-symbol.svg';
import { useAccount } from '@shared/hooks/api/useAccount';
import { LazyPayAllOrdersBtn } from '../exports/exports-lazy';
import { useDebt } from '../hooks/api/usePaymentStats';

export const Debt = () => {
  const { data: account } = useAccount();
  const { data: debt, isLoading: isLoadingDebt, isError: isErrorDebt, isSuccess: isSuccessDebt } = useDebt(account?.user_id ?? 0);

  return (
    <div className='grid w-full grid-cols-[130px_auto] place-content-stretch gap-5 sm:flex sm:w-fit sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex flex-col items-start justify-center gap-2.5 sm:items-center'>
        <p className='text-sm text-black/85'>Задолженность</p>
        {isSuccessDebt && <p className='text-lg font-bold text-red-600'>{debt} Gamler</p>}
        {isLoadingDebt && <p className='text-lg font-bold text-red-600'>Загрузка...</p>}
        {isErrorDebt && <p className='text-lg font-bold text-red-600'>Ошибка загрузки задолжености</p>}
        {!account?.user_id && !debt && <p className='text-lg font-bold text-red-600'>0 Gamler</p>}
      </div>
      <div className='flex flex-row items-center justify-end gap-2.5'>
        <LazyPayAllOrdersBtn />
        <HelperIcon />
      </div>
    </div>
  );
};
