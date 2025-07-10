import { useAccount } from '@/shared/hooks/api/useAccount';
import { Table, type GetProp, type TablePaginationConfig, type TableProps } from 'antd';
import Column from 'antd/es/table/Column';
import type { SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
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

export const InviteTable = () => {
  const { data: account } = useAccount();
  const {
    data: referrals,
    isLoading: isLoadingRefferals,
    isError: isErrorRefferals,
    isSuccess: isSuccessRefferals,
  } = useRefferals(account?.user_id ?? 0);
  const referrals_table_data = referrals ? trimUserData(referrals) : { referred_users: [] };

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
      {isSuccessRefferals && referrals_table_data?.referred_users ? (
        <Table
          dataSource={referrals_table_data.referred_users}
          onChange={handleTableChange}
          pagination={tableParams.pagination}
          className='table-scroll'
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
      ) : (
        <p className='font-black/85 text-sm'>
          Здесь появятся люди, которых вы пригласили. Пока список пуст — начните приглашать и зарабатывайте вознаграждения!
        </p>
      )}
      {(isLoadingRefferals || isErrorRefferals) && <TableSkeleton rows={3} columns={4} />}
    </>
  );
};
