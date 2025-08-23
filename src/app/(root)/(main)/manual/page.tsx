import { ManualModule } from '@/modules/manual/module';

export default function ManualPage() {
  return (
    <>
      <ManualDescription />
      <ManualModule />
    </>
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
