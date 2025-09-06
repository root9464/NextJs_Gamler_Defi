import TestImg from '@/assets/img/test.jpg';
import Test2Img from '@/assets/img/test2.jpg';
import CoinIcon from '@/assets/svg/coin.svg';
import PlusIcon from '@/assets/svg/plus.svg';
import { NotOwn } from '@/modules/video/scene/features/not-own-card';
import { UserAllCard } from '@/modules/video/scene/slices/user-all-cards';
import { SettingsCoins } from '../features/setting-coins';

const CardsArr = [
  { id: '1', img: TestImg },
  { id: '2', img: Test2Img },
];

export const CardHolder = () => {
  return (
    <div className='flex h-[69px] w-full justify-between gap-5'>
      <div className='flex h-full grow gap-5'>
        {CardsArr.map((card) => (
          <NotOwn key={card.id} img={card.img} id={card.id} />
        ))}
      </div>
      <UserAllCard />
      <div className='flex h-full w-[49px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] bg-white text-sm text-black'>
        <PlusIcon />
      </div>
      <SettingsCoins className='flex h-full w-[49px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] bg-[#005C2F] text-sm text-white'>
        <CoinIcon />
        <p>0 +</p>
      </SettingsCoins>
    </div>
  );
};
