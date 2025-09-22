'use client';

import { Tab, TabList, TabPanel, Tabs } from '@ui/tabs';
import { DynamicPayAllOrdersBtn } from '../partner-balance/exports/exports';
import { DebtTable } from './entities/debt-table';
import { InviteTable } from './entities/invite-table';
import { TransactionsTable } from './entities/transactions-table';

export const TableStatisticsModule = () => (
  <div className='flex w-full flex-col gap-2.5'>
    <Tabs aria-label='Table Statistics'>
      <TabList className='flex flex-col items-center gap-[30px] sm:flex-row'>
        <Tab id='1'>История транзакций</Tab>
        <Tab id='2'>Ваши приглашённые</Tab>
        <Tab id='3'>Задолженности</Tab>
      </TabList>
      <TabPanel id='1' className='flex h-fit flex-col gap-4'>
        <TransactionsTable />
      </TabPanel>
      <TabPanel id='2' className='flex h-fit flex-col gap-4'>
        <InviteTable />
      </TabPanel>
      <TabPanel id='3' className='flex h-fit flex-col gap-4'>
        <div className='mb-4 hidden flex-row items-center gap-2.5 sm:flex'>
          <DynamicPayAllOrdersBtn />
          <p className='text-sm text-gray-700'>
            Чтобы погасить все задолженности сразу, нажмите кнопку “Погасить все”. Или выберите реферала и оплатите каждую транзакцию отдельно
          </p>
        </div>
        <DebtTable />
      </TabPanel>
    </Tabs>
  </div>
);
