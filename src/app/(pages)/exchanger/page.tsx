import { PageFlow } from '@/components/layouts/page-flow';
import { SwapModule } from '@/modules/swap/module';

export default function ExchangerPage() {
  return (
    <PageFlow
      classNames={{
        content: 'flex max-h-[calc(100vh-64px)] w-full flex-col gap-8 py-4 px-[30px] md:pl-6 md:pr-[60px]',
      }}>
      <DexDescription />
      <SwapModule />
    </PageFlow>
  );
}

const DexDescription = () => {
  return (
    <div className='flex flex-col gap-2.5'>
      <h2 className='heading-1'>Обменник</h2>
      <p className='title-1'>
        Gamler- это ваша основная и единственная валюта на платформе. Обменивайте свои заработанные Gamler на криптовалюту TON в пару кликов.
        Прозрачные условия, моментальные переводы и никакой головной боли — только ты, Gamler и TON.
      </p>
    </div>
  );
};
