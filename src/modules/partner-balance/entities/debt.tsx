'use client';
import HelperIcon from '@assets/svg/helper-symbol.svg';
import { PayAllOrdersBtn } from '@modules/table-statistics/features/pay-all-orders-btn';
import { useAccount } from '@shared/hooks/api/useAccount';
import { useDebt } from '../hooks/api/usePaymentStats';

export const Debt = () => {
  const { data: account } = useAccount();
  const { data: debt, isLoading: isLoadingDebt, isError: isErrorDebt, isSuccess: isSuccessDebt } = useDebt(account?.user_id ?? 0);

  return (
    <div className='flex flex-row items-center justify-between gap-5'>
      <div className='flex flex-col items-center justify-center gap-2.5'>
        <p className='text-sm text-black/85'>Задолженонсть</p>
        {isSuccessDebt && <p className='text-lg font-bold text-red-600'>{debt} Gamler</p>}
        {isLoadingDebt && <p className='text-lg font-bold text-red-600'>Загрузка...</p>}
        {isErrorDebt && <p className='text-lg font-bold text-red-600'>Ошибка загрузки задолжености</p>}
        {!account?.user_id && !debt && <p className='text-lg font-bold text-red-600'>0 Gamler</p>}
      </div>
      <div className='flex flex-row items-center gap-2.5'>
        <PayAllOrdersBtn />
        <HelperIcon />
      </div>
    </div>
  );
};
