'use client';

import { useTonAddress } from '@tonconnect/ui-react';
import { Tab, TabList, TabPanel, Tabs } from '@ui/tabs';
import { DebtTable } from './entities/debt-table';
import { InviteTable } from './entities/invite-table';
import { TransactionsTable } from './entities/transactions-table';

export const TableStatisticsModule = () => {
  const address = useTonAddress();

  return (
    <div className='flex w-full flex-col gap-2.5'>
      <Tabs aria-label='Table Statistics'>
        <TabList className='flex flex-col items-center gap-[30px] sm:flex-row'>
          <Tab id='1'>История транзакций</Tab>
          <Tab id='2'>Ваши приглашённые</Tab>
          <Tab id='3'>Задолженности</Tab>
        </TabList>
        <TabPanel id='1' className='flex h-fit flex-col gap-4'>
          <TransactionsTable address={address ?? ''} />
        </TabPanel>
        <TabPanel id='2' className='flex h-fit flex-col gap-4'>
          <InviteTable address={address ?? ''} />
        </TabPanel>
        <TabPanel id='3' className='flex h-fit flex-col gap-4'>
          <DebtTable />
        </TabPanel>
      </Tabs>
    </div>
  );
};
