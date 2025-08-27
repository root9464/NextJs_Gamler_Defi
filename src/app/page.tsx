'use client';
import MoneyIco from '@/assets/svg/money.svg';
import { ChangeDices } from '@/modules/games/curash/features/change-dices';
import { ChangeTimer } from '@/modules/video-hub/scene/features/change-timer';
import { ChangeTrick } from '@/modules/games/curash/features/change-trick';
import { GiveUserCard } from '@/modules/video-hub/scene/features/give-user-card';
import { SettingsCoins } from '@/modules/games/curash/features/setting-coins';

export default function Home() {
  return (
    <>
      <ChangeDices />
      <ChangeTimer />
      <ChangeTrick />
      <GiveUserCard />
      <SettingsCoins className='flex h-min w-[49px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] bg-[#005C2F] text-sm text-white'>
        <MoneyIco />
        <p>0 +</p>
      </SettingsCoins>
    </>
  );
}
