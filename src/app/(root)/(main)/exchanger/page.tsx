import { SwapModule } from '@/modules/swap/module';

export default function ExchangerPage() {
  return (
    <>
      <DexDescription />
      <SwapModule />
    </>
  );
}

const DexDescription = () => {
  return (
    <div className='flex flex-col gap-2.5'>
      <h2 className='heading-1'>Обменник</h2>
      <p className='title-1 w-[980px]'>
        Gamler- это ваша основная и единственная валюта на платформе. Обменивайте свои заработанные Gamler на криптовалюту TON в пару кликов.
        Прозрачные условия, моментальные переводы и никакой головной боли — только ты, Gamler и TON.
      </p>
    </div>
  );
};
