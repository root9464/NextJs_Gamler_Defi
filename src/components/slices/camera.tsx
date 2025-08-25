'use client';
import HeartIco from '@/assets/svg/hearthub.svg';
import MuteIco from '@/assets/svg/mute.svg';
import { UserInfo } from '@/components/slices/user-info';
import { useState } from 'react';

export const Camera = () => {
  const [like, setLike] = useState(false);

  return (
    <div className='relative flex h-50 w-[332px] flex-col justify-between rounded-[11px] bg-red-300 px-[15px] py-[18px]'>
      <div className='flex w-full justify-between'>
        <div className='flex h-[22px] w-11 items-center justify-center rounded-[55px] bg-white text-xs text-black'>
          <p>1:00</p>
        </div>
        <div className='flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#222226]/50'>
          <MuteIco />
        </div>
      </div>
      {/* <video src='' /> */}
      <div className='flex h-[35px] w-full items-center justify-between'>
        <h1>Игрок 1</h1>
        <div className='flex gap-2.5'>
          <UserInfo />
          <div
            className='flex h-[35px] w-fit cursor-pointer items-center justify-center gap-1.5 rounded-full bg-[#222226] px-2'
            onClick={() => setLike((prev) => !prev)}>
            <HeartIco className={like ? 'fill-red-500' : 'fill-white'} />
            {like && <p>1</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
