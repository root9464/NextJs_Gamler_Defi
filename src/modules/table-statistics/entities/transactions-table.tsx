import { useTonAddress } from '@tonconnect/ui-react';
import { Table, type GetProp, type TablePaginationConfig, type TableProps } from 'antd';
import Column from 'antd/es/table/Column';
import type { SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
import { filterFrogeTransfers } from '../helpers/serialyze';
import { useGetTransactions } from '../hooks/api/useGetTransactions';
import { TableSkeleton } from '../slices/table-skeleton';

type TransactionsTableDataType = {
  id: string;
  time: string;
  amount: number;
  action: string;
};

type TableParams = {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<TransactionsTableDataType>['field'];
  sortOrder?: SorterResult<TransactionsTableDataType>['order'];
  filters?: Parameters<GetProp<TableProps<TransactionsTableDataType>, 'onChange'>>[1];
};

export const TransactionsTable = () => {
  const address = useTonAddress();

  const {
    data: transactions,
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
    error: errorTransactions,
    isSuccess: isSuccessTransactions,
  } = useGetTransactions(address ?? '');

  const transactions_table_data = transactions && filterFrogeTransfers(transactions);
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
      {isSuccessTransactions && transactions && (
        <Table
          dataSource={transactions_table_data}
          onChange={handleTableChange}
          pagination={tableParams.pagination}
          rowKey='id'
          className='table-scroll'>
          <Column title='Дата' dataIndex='time' key='time' />
          <Column title='Сумма' dataIndex='amount' key='amount' />
          <Column title='Действие' dataIndex='action' key='action' />
        </Table>
      )}
      {isLoadingTransactions && <TableSkeleton rows={3} columns={3} />}
      {isErrorTransactions && <p>Ошибка при загрузке транзакций {errorTransactions.message}</p>}
    </>
  );
};
