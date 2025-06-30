'use client';

import { Button } from '@/components/ui/button';
import { useAccount } from '@/shared/hooks/api/useAccount';
import { formatUnixToDate } from '@/shared/utils/common.utils';
import { useTonAddress } from '@tonconnect/ui-react';
import { Tab, TabList, TabPanel, Tabs } from '@ui/tabs';
import { filterFrogeTransfers, trimUserData } from './helpers/serialyze';
import { useGetTransactions } from './hooks/api/useGetTransactions';
import { usePay } from './hooks/api/usePay';
import { usePaymentOrder } from './hooks/api/usePaymentOrders';
import { usePayAllOrders } from './hooks/api/usePayOrder';
import { useRefferals } from './hooks/api/useRefferals';
import { DebtTable } from './slices/debt-table';
import { InviteTable } from './slices/invite-table';
import { TransactionsTable } from './slices/transactions-table';

export const TableStatisticsModule = () => {
  const address = useTonAddress();
  const { data: account } = useAccount();

  const {
    data: paymentOrders,
    isLoading: isLoadingPaymentOrders,
    isError: isErrorPaymentOrders,
    error: errorPaymentOrders,
    isSuccess: isSuccessPaymentOrders,
  } = usePaymentOrder(account?.user_id ?? 0);

  const debt_table_data = paymentOrders
    ? paymentOrders.map((order) => ({
        order_id: order.id,
        tickets: order.ticket_count,
        date: formatUnixToDate(order.created_at),
        debt_amount: Number(order.total_amount),
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

  const {
    data: refferals,
    isLoading: isLoadingRefferals,
    isError: isErrorRefferals,
    error: errorRefferals,
    isSuccess: isSuccessRefferals,
  } = useRefferals(address);
  const refferals_table_data = refferals && trimUserData(refferals);

  const {
    data: transactions,
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
    error: errorTransactions,
    isSuccess: isSuccessTransactions,
  } = useGetTransactions(address ?? '');

  const transactions_table_data = transactions && filterFrogeTransfers(transactions);

  return (
    <div className='flex w-[1141px] flex-col gap-2.5'>
      <Tabs aria-label='Table Statistics'>
        <TabList>
          <Tab id='1'>История транзакций</Tab>
          <Tab id='2'>Ваши приглашённые</Tab>
          <Tab id='3'>Задолженности</Tab>
        </TabList>
        <TabPanel id='1'>
          {isSuccessTransactions && transactions && <TransactionsTable tableData={transactions_table_data ?? []} />}
          {isLoadingTransactions && <p>Loading...</p>}
          {isErrorTransactions && <p>Ошибка при загрузке транзакций {errorTransactions.message}</p>}
        </TabPanel>
        <TabPanel id='2'>
          {isSuccessRefferals && refferals_table_data && <InviteTable tableData={refferals_table_data.referred_users ?? []} />}
          {isLoadingRefferals && <p>Loading...</p>}
          {isErrorRefferals && <p>Ошибка при загрузке рефералов {errorRefferals.message}</p>}
        </TabPanel>
        <TabPanel id='3'>
          <div className='flex flex-row gap-2.5'>
            <Button intent='primary' onClick={handlePayAllOrders}>
              {isPendingPayAllOrders ? 'Ожидание...' : isSuccessPayAllOrders ? 'Выполнено' : 'Погасить все'}
            </Button>
            <p className='text-sm text-black/85'>
              Чтобы погасить все задолженности сразу, нажмите кнопку “Погасить все”. Или выберите реферала и оплатите каждую транзакцию отдельно
            </p>
          </div>
          {isSuccessPaymentOrders && debt_table_data && <DebtTable tableData={debt_table_data} />}
          {isLoadingPaymentOrders && <p>Loading...</p>}
          {isErrorPaymentOrders && <p>Ошибка при загрузке задолженностей {errorPaymentOrders.message}</p>}
        </TabPanel>
      </Tabs>
    </div>
  );
};
