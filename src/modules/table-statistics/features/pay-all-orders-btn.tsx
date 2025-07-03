import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@components/ui/button';
import { useAccount } from '@shared/hooks/api/useAccount';
import { usePay } from '../hooks/api/usePay';
import { usePayAllOrders } from '../hooks/api/usePayOrder';
import { usePaymentOrder } from '../hooks/api/usePaymentOrders';

export const PayAllOrdersBtn = () => {
  const { data: account } = useAccount();

  const {
    data: paymentOrders,
    isLoading: isLoadingPaymentOrders,
    isError: isErrorPaymentOrders,
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

  const isNullDebt = debt_arr.length > 0;
  return (
    <>
      {isSuccessPaymentOrders && isNullDebt && (
        <Button intent='primary' onClick={handlePayAllOrders}>
          {isPendingPayAllOrders ? 'Ожидание...' : isSuccessPayAllOrders ? 'Выполнено' : 'Погасить'}
        </Button>
      )}
      {isSuccessPaymentOrders && !isNullDebt && (
        <Button intent='primary' isDisabled>
          Погашено
        </Button>
      )}
      {(isLoadingPaymentOrders || isErrorPaymentOrders) && <Skeleton className='h-9 w-[100px]' />}
    </>
  );
};
