import HelperIcon from '@assets/svg/helper-symbol.svg';
import { WalletConnectButton } from '@components/features/connect-wallet-button';
import { CurrentBalance } from './entities/current-balance';
import { Debt } from './entities/debt';

export const PartnerBalanceModule = () => {
  return (
    <>
      <div className='flex h-fit w-full flex-col justify-between gap-2.5 sm:h-32'>
        <h2 className='text-lg font-medium text-black/85'>Партнерский баланс:</h2>
        <div className='flex h-fit w-full flex-col items-start gap-2.5 sm:h-[90px] sm:flex-row sm:items-center'>
          <div className='flex h-fit w-full flex-col items-center justify-between gap-2.5 bg-[#F6FFED] px-5 py-4 sm:h-[90px] sm:w-[832px] sm:flex-row sm:gap-0 sm:px-[26px] sm:py-[18px]'>
            <CurrentBalance />
            <Line />
            <Debt />
          </div>
          <div className='flex flex-row items-center gap-2.5 px-5 sm:px-0'>
            <WalletConnectButton />
            <HelperIcon />
          </div>
        </div>
      </div>
    </>
  );
};

const Line = () => <div className='hidden h-full w-0.5 bg-black/10 sm:block' />;
