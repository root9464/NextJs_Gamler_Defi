'use client';
import MoneyIco from '@/assets/svg/money.svg';
import { CoinModal } from './coin-modal';
import { NotOwn } from './not-own-modal';
import { UserAllCard } from './user-all';
import { UsersIssue } from './user-issue';

export const CardsCurash = () => {
  return (
    <div className='flex h-[69px] w-full justify-between gap-5'>
      <div className='h-full grow'></div>
      <UsersIssue />
      <UserAllCard />
      <NotOwn />
      <CoinModal className='flex h-full w-[49px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] bg-[#005C2F] text-sm text-white'>
        <MoneyIco />
        <p>0 +</p>
      </CoinModal>
    </div>
  );
};
