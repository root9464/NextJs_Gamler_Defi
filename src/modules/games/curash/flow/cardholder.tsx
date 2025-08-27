import CoinIcon from '@/assets/svg/coin.svg';
import PlusIcon from '@/assets/svg/plus.svg';
import { SettingsCoins } from '../features/setting-coins';
import { UserAllCard } from '../../../video-hub/scene/slices/user-all-cards';

export const CardHolder = () => {
  return (
    <div className='flex h-[69px] w-full justify-between gap-5'>
      <div className='h-full grow'>{/* все остальные карты что получаются в игре */}</div>
      <div className='flex h-full w-[49px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] bg-white text-sm text-black'>
        <PlusIcon />
      </div>

      <UserAllCard />

      <SettingsCoins className='flex h-full w-[49px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] bg-[#005C2F] text-sm text-white'>
        <CoinIcon />
        <p>0 +</p>
      </SettingsCoins>
    </div>
  );
};
