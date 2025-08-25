'use client';

import { CoinModal2 } from './coin-modal2';
import { NotOwn } from './not-own-modal';
import { UsersIssue } from './user-issue';
import { UserAllCard } from './userall-modal';

export const CardsCurash = () => {
  return (
    <div className='flex h-[69px] w-full justify-between gap-5'>
      <div className='h-full grow'></div>
      <UsersIssue />
      <UserAllCard />
      <NotOwn />
      <CoinModal2 />
    </div>
  );
};
