import { PageFlow } from '@/components/layouts/page-flow';
import { DebtTable } from '@/modules/table-statistics/entities/debt-table';

export default function Home() {
  return (
    <PageFlow classNames={{ content: 'flex h-full w-full flex-col gap-8 px-[18px] py-4' }}>
      <DebtTable />
    </PageFlow>
  );
}
