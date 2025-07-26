import { PageFlow } from '@/components/layouts/page-flow';

export default function ManualPage() {
  return (
    <PageFlow
      classNames={{
        content: 'flex max-h-[calc(100vh-64px)] w-full flex-col gap-8 py-4 px-[30px] md:pl-6 md:pr-[60px]',
      }}>
      <ManualDescription />
    </PageFlow>
  );
}

const ManualDescription = () => {
  return (
    <div className='flex flex-col gap-2.5'>
      <h2 className='heading-1'>Подключение кошелька</h2>
      <p className='title-1'>
        Следуйте шагам ниже для корректного подключения кошелькаЭто займёт всего пару минут — просто выполняйте инструкции по порядку, и всё
        заработает.
      </p>
    </div>
  );
};
