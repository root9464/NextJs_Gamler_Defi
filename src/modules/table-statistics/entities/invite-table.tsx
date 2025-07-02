import { Table, type GetProp, type TablePaginationConfig, type TableProps } from 'antd';
import Column from 'antd/es/table/Column';
import type { SorterResult } from 'antd/es/table/interface';
import { useState, type FC } from 'react';
import { trimUserData } from '../helpers/serialyze';
import { useRefferals } from '../hooks/api/useRefferals';
import { TableSkeleton } from '../slices/table-skeleton';

export type InviteTableType = {
  user_id: number;
  name: string | null;
  telegram: string;
  refer_id: number | null | undefined;
  percent?: number;
  createdAt?: string | null;
  referred_users?: InviteTableType[];
};

type TableParams = {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<InviteTableType>['field'];
  sortOrder?: SorterResult<InviteTableType>['order'];
  filters?: Parameters<GetProp<TableProps<InviteTableType>, 'onChange'>>[1];
};

export const InviteTable: FC<{ address: string }> = ({ address }) => {
  const {
    data: refferals,
    isLoading: isLoadingRefferals,
    isError: isErrorRefferals,
    error: errorRefferals,
    isSuccess: isSuccessRefferals,
  } = useRefferals(address);
  const refferals_table_data = refferals && trimUserData(refferals);

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
      {isSuccessRefferals && refferals_table_data && (
        <Table
          dataSource={refferals_table_data.referred_users}
          onChange={handleTableChange}
          pagination={tableParams.pagination}
          rowKey='user_id'>
          <Column title='Реферал' dataIndex='name' key='name' />
          <Column
            title='Процент'
            dataIndex='percent'
            key='percent'
            sorter={(a: InviteTableType, b: InviteTableType) => (a.percent ?? 0) - (b.percent ?? 0)}
          />
          <Column title='Телеграм' dataIndex='telegram' key='telegram' />
          <Column
            title='Дата'
            dataIndex='createdAt'
            sorter={(a: InviteTableType, b: InviteTableType) => (a.createdAt ?? '').localeCompare(b.createdAt ?? '')}
            key='createdAt'
          />
        </Table>
      )}
      {isLoadingRefferals && <TableSkeleton rows={3} columns={4} />}
      {isErrorRefferals && <p>Ошибка при загрузке рефералов {errorRefferals.message}</p>}
    </>
  );
};
