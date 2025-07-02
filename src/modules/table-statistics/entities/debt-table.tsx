import { Skeleton } from '@/components/ui/skeleton';
import { useAccount } from '@/shared/hooks/api/useAccount';
import { formatUnixToDate } from '@/shared/utils/common.utils';
import { Table, type GetProp, type TablePaginationConfig, type TableProps } from 'antd';
import Column from 'antd/es/table/Column';
import type { SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
import { LazyPayAllOrdersBtn } from '../exports/exports-lazy';
import { usePay } from '../hooks/api/usePay';
import { usePayOrder } from '../hooks/api/usePayOrder';
import { usePaymentOrder } from '../hooks/api/usePaymentOrders';
import { TableSkeleton } from '../slices/table-skeleton';

export type DebtTableDataType = {
  order_id: string;
  tickets: number;
  date: string;
  debt_amount: number;
  refferal: string;
  refferer_id: number;
};

type TableParams = {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<DebtTableDataType>['field'];
  sortOrder?: SorterResult<DebtTableDataType>['order'];
  filters?: Parameters<GetProp<TableProps<DebtTableDataType>, 'onChange'>>[1];
};

export const DebtTable = () => {
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

  const { mutateAsync: createCell, isPending, isSuccess } = usePayOrder();
  const { payOrder } = usePay(account?.user_id ?? 0);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams((prev) => ({
      ...prev,
      pagination,
    }));
  };

  return (
    <>
      {isSuccessPaymentOrders && debt_table_data && (
        <>
          <div className='flex flex-row items-center gap-2.5'>
            <LazyPayAllOrdersBtn />
            <p className='text-sm text-black/85'>
              Чтобы погасить все задолженности сразу, нажмите кнопку “Погасить все”. Или выберите реферала и оплатите каждую транзакцию отдельно
            </p>
          </div>
          <Table dataSource={debt_table_data} onChange={handleTableChange} pagination={tableParams.pagination} rowKey='order_id'>
            <Column
              title='Количество билетов'
              dataIndex='tickets'
              sorter={(a: DebtTableDataType, b: DebtTableDataType) => a.tickets - b.tickets}
              key='tickets'
            />
            <Column
              title='Дата'
              dataIndex='date'
              sorter={(a: DebtTableDataType, b: DebtTableDataType) => a.date.localeCompare(b.date)}
              key='date'
            />
            <Column
              title='Сумма задолженности'
              dataIndex='debt_amount'
              sorter={(a: DebtTableDataType, b: DebtTableDataType) => a.debt_amount - b.debt_amount}
              key='debt_amount'
            />
            <Column title='Реферал' dataIndex='refferal' key='refferal' />
            <Column
              title={isPending ? 'Ожидание...' : isSuccess ? 'Выполнено' : 'Действие'}
              dataIndex='action'
              render={(_, record: DebtTableDataType) => (
                <a
                  key={record.order_id}
                  className='cursor-pointer bg-transparent text-start text-[16px] font-medium text-[#1890FF] underline'
                  onClick={() => payOrder(createCell, record.order_id, { amount: record.debt_amount, reffererId: record.refferer_id })}>
                  Погасить задолженность
                </a>
              )}
              key='action'
            />
          </Table>
        </>
      )}
      {isLoadingPaymentOrders && (
        <>
          <Skeleton className='h-9 w-[200px]' />
          <TableSkeleton rows={3} columns={5} />
        </>
      )}
      {isErrorPaymentOrders && <p>Ошибка при загрузке задолженностей {errorPaymentOrders.message}</p>}
    </>
  );
};
