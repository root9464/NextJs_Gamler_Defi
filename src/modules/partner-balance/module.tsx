import HelperIcon from '@assets/svg/helper-symbol.svg';
import { WalletConnectButton } from '@components/features/connect-wallet-button';
import { CurrentBalance } from './entities/current-balance';
import { Debt } from './entities/debt';

export const PartnerBalanceModule = () => {
  return (
    <>
      <div className='flex h-32 w-full flex-col justify-between gap-2.5'>
        <h2 className='text-lg font-medium text-black/85'>Партнерский баланс:</h2>
        <div className='flex h-[90px] w-full flex-row items-center gap-2.5'>
          <div className='flex h-[90px] w-[832px] flex-row items-center justify-between bg-[#F6FFED] px-[26px] py-[18px]'>
            <CurrentBalance />
            <Line />
            <Debt />
          </div>
          <div className='flex flex-row items-center gap-2.5'>
            <WalletConnectButton />
            <HelperIcon />
          </div>
        </div>
      </div>
    </>
  );
};

const Line = () => <div className='h-full w-0.5 bg-black/10' />;
