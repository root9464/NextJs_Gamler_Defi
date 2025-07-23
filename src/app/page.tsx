import { PageFlow } from '@/components/layouts/page-flow';
import { DescWorkProgram } from '@/components/slices/desc-work-program';

export default function Home() {
  return (
    <PageFlow classNames={{ content: 'flex h-full w-full flex-col gap-8 px-[18px] py-4' }}>
      <DescWorkProgram />
    </PageFlow>
  );
}
