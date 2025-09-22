'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { useAccount } from '@/shared/hooks/api/useAccount';
import { useDisclosure } from '@/shared/hooks/useDisclosure';
import { formatUnixToDate } from '@/shared/utils/common.utils';
import { useTonAddress } from '@tonconnect/ui-react';
import { Table, type GetProp, type TablePaginationConfig, type TableProps } from 'antd';
import Column from 'antd/es/table/Column';
import type { SorterResult } from 'antd/es/table/interface';
import type { FC } from 'react';
import { useState } from 'react';
import { PayModal } from '../features/pay-modal';
import { useDeletePaymentOrder, type DeletePaymentOrderFn } from '../hooks/api/useDeletePaymentOrder';
import type { CreateCellFn } from '../hooks/api/usePay';
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
  tr_hash: string | undefined;
};

type TableParams = {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<DebtTableDataType>['field'];
  sortOrder?: SorterResult<DebtTableDataType>['order'];
  filters?: Parameters<GetProp<TableProps<DebtTableDataType>, 'onChange'>>[1];
};

export const DebtTable = () => {
  const { data: account } = useAccount();
  const modalDisclosureControl = useDisclosure();
  const address = useTonAddress();
  const { mutateAsync: deleteOrder } = useDeletePaymentOrder(account?.user_id ?? 0, modalDisclosureControl.onClose);

  const {
    data: paymentOrders,
    isLoading: isLoadingPaymentOrders,
    isError: isErrorPaymentOrders,
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
        tr_hash: order.tr_hash,
      }))
    : [];

  const { mutateAsync: createCell, isPending, isSuccess } = usePayOrder();
  const { payOrder } = usePay(account?.user_id ?? 0, {
    onOpen: modalDisclosureControl.onOpen,
    onClose: modalDisclosureControl.onClose,
  });

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
    <div className='custom-scroll'>
      <PayModal isOpen={modalDisclosureControl.isOpen} />
      {isSuccessPaymentOrders && debt_table_data.length > 0 ? (
        <Table<DebtTableDataType>
          dataSource={debt_table_data}
          onChange={handleTableChange}
          pagination={tableParams.pagination}
          showSorterTooltip={false}
          rowKey='order_id'
          className='table-scroll'>
          <Column<DebtTableDataType> title='Количество билетов' dataIndex='tickets' sorter={(a, b) => a.tickets - b.tickets} key='tickets' />
          <Column<DebtTableDataType> title='Дата' dataIndex='date' sorter={(a, b) => a.date.localeCompare(b.date)} key='date' />
          <Column<DebtTableDataType>
            title='Сумма задолженности'
            dataIndex='debt_amount'
            sorter={(a, b) => a.debt_amount - b.debt_amount}
            key='debt_amount'
          />
          <Column<DebtTableDataType> title='Реферал' dataIndex='refferal' key='refferal' />
          <Column<DebtTableDataType>
            title={isPending ? 'Ожидание...' : isSuccess ? 'Выполнено' : 'Действие'}
            dataIndex='action'
            render={(_, record) => (
              <ActionColumn
                record={record}
                payOrder={payOrder}
                createCell={createCell}
                deleteOrder={deleteOrder}
                address={address ?? ''}
                onOpenModal={modalDisclosureControl.onOpen}
              />
            )}
            key='action'
          />
        </Table>
      ) : (
        <p className='font-black/85 text-sm'>Список задолженностей пуст</p>
      )}

      {(isLoadingPaymentOrders || isErrorPaymentOrders) && (
        <>
          <Skeleton className='mb-4 h-9 w-[200px]' />
          <TableSkeleton rows={3} columns={5} />
        </>
      )}
    </div>
  );
};

type ActionColumnProps = {
  record: DebtTableDataType;
  payOrder: (createCell: CreateCellFn<string>, orderId: string, obj: { amount: number; reffererId: number }) => void;
  createCell: (id: string) => Promise<{ cell: string }>;
  onOpenModal?: () => void;
  deleteOrder: DeletePaymentOrderFn;
  address: string;
};

const ActionColumn: FC<ActionColumnProps> = ({ record, payOrder, createCell, deleteOrder, address, onOpenModal }) => (
  <>
    {record.tr_hash ? (
      <a
        key={record.order_id}
        className='cursor-pointer bg-transparent text-start text-[16px] font-medium text-blue-500 underline'
        onClick={() => {
          onOpenModal?.();
          deleteOrder([
            {
              tx_hash: record.tr_hash ?? '',
              tx_query_id: Math.floor(Date.now() / 1000),
              target_address: address,
              payment_order_id: record.order_id,
              status: 'pending',
            },
            {
              type: 'single',
              orderId: record.order_id,
              array: [{ amount: record.debt_amount, reffererId: record.refferer_id }],
            },
          ]);
        }}>
        Проверить задолженность
      </a>
    ) : (
      <a
        key={record.order_id}
        className='cursor-pointer bg-transparent text-start text-[16px] font-medium text-blue-500 underline'
        onClick={() => payOrder(createCell, record.order_id, { amount: record.debt_amount, reffererId: record.refferer_id })}>
        Погасить задолженность
      </a>
    )}
  </>
);
