'use client';
import HelperIcon from '@/assets/svg/helper-symbol.svg';
import { Button } from '@/components/ui/button';
import { usePay } from '@/modules/table-statistics/hooks/api/usePay';
import { usePaymentOrder } from '@/modules/table-statistics/hooks/api/usePaymentOrders';
import { usePayAllOrders } from '@/modules/table-statistics/hooks/api/usePayOrder';
import { useAccount } from '@/shared/hooks/api/useAccount';
import { formatUnixToDate } from '@/shared/utils/common.utils';
import { useTonAddress } from '@tonconnect/ui-react';
import { useDebt } from '../hooks/api/usePaymentStats';

export const Debt = () => {
  const address = useTonAddress();
  const { data: account } = useAccount(address ?? '');

  const { data: paymentOrders } = usePaymentOrder(account?.user_id ?? 0);

  const debt_table_data = paymentOrders
    ? paymentOrders.map((order) => ({
        order_id: order.id,
        tickets: order.ticket_count,
        date: formatUnixToDate(order.created_at),
        debt_amount: order.total_amount,
        refferer_id: order.referrer_id,
        refferal: order.telegram,
      }))
    : [];

  const { mutateAsync: createCell, isPending: isPendingPayAllOrders, isSuccess: isSuccessPayAllOrders } = usePayAllOrders();

  const { payAllOrders } = usePay(account?.user_id ?? 0);
  const debt_arr = debt_table_data.map((order) => ({
    amount: order.debt_amount,
    reffererId: order.refferer_id,
  }));

  const handlePayAllOrders = () => payAllOrders(createCell, debt_arr);

  const { data: debt, isLoading: isLoadingDebt, isError: isErrorDebt, isSuccess: isSuccessDebt } = useDebt(account?.user_id ?? 0);

  return (
    <div className='flex flex-row items-center justify-between gap-5'>
      <div className='flex flex-col items-center justify-center gap-2.5'>
        <p className='text-sm text-black/85'>Задолженость</p>
        {isSuccessDebt && debt && <p className='text-lg font-bold text-red-600'>{debt} Gamler</p>}
        {isLoadingDebt && <p className='text-lg font-bold text-red-600'>Загрузка...</p>}
        {isErrorDebt && <p className='text-lg font-bold text-red-600'>Ошибка загрузки задолжености</p>}
        {!account?.user_id && !debt && <p className='text-lg font-bold text-red-600'>0 Gamler</p>}
      </div>
      <div className='flex flex-row items-center gap-2.5'>
        <Button size='sm' intent='primary' onClick={handlePayAllOrders}>
          {isPendingPayAllOrders ? 'Ожидание...' : isSuccessPayAllOrders ? 'Выполнено' : 'Погасить все'}
        </Button>
        <HelperIcon />
      </div>
    </div>
  );
};
