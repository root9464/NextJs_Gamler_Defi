import { Button } from '@components/ui/button';
import { useAccount } from '@shared/hooks/api/useAccount';
import { Skeleton } from 'antd';
import { usePay } from '../hooks/api/usePay';
import { usePayAllOrders } from '../hooks/api/usePayOrder';
import { usePaymentOrder } from '../hooks/api/usePaymentOrders';

export const PayAllOrdersBtn = () => {
  const { data: account } = useAccount();

  const {
    data: paymentOrders,
    isLoading: isLoadingPaymentOrders,
    isError: isErrorPaymentOrders,
    error: errorPaymentOrders,
    isSuccess: isSuccessPaymentOrders,
  } = usePaymentOrder(account?.user_id ?? 0);

  const debt_arr = paymentOrders
    ? paymentOrders.map((order) => ({
        amount: Number(order.total_amount),
        reffererId: order.referrer_id,
      }))
    : [];

  const { mutateAsync: createCell, isPending: isPendingPayAllOrders, isSuccess: isSuccessPayAllOrders } = usePayAllOrders();

  const { payAllOrders } = usePay(account?.user_id ?? 0);
  const handlePayAllOrders = () => payAllOrders(createCell, debt_arr);

  return (
    <>
      {isSuccessPaymentOrders && debt_arr.length > 0 && (
        <Button intent='primary' onClick={handlePayAllOrders}>
          {isPendingPayAllOrders ? 'Ожидание...' : isSuccessPayAllOrders ? 'Выполнено' : 'Погасить все'}
        </Button>
      )}
      {isLoadingPaymentOrders && <Skeleton className='h-9 w-[140px]' />}
      {isErrorPaymentOrders && <p>Ошибка при загрузке задолженностей {errorPaymentOrders.message}</p>}
    </>
  );
};
