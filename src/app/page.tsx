import { PageFlow } from '@/components/layouts/page-flow';
import { LazyPayAllOrdersBtn } from '@/modules/partner-balance/exports/exports-lazy';
import { DebtTable } from '@/modules/table-statistics/entities/debt-table';

export default function Home() {
  return (
    <PageFlow classNames={{ content: 'flex h-full w-full flex-col gap-8 px-[18px] py-4' }}>
      <div className='mb-4 hidden flex-row items-center gap-2.5 sm:flex'>
        <LazyPayAllOrdersBtn />
        <p className='text-sm text-gray-700'>
          Чтобы погасить все задолженности сразу, нажмите кнопку “Погасить все”. Или выберите реферала и оплатите каждую транзакцию отдельно
        </p>
      </div>
      <DebtTable />
    </PageFlow>
  );
}
