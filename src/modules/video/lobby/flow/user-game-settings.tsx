'use client';
import ChangeIcon from '@/assets/svg/change.svg';
import type { FC, ReactNode } from 'react';

type UserGameSettings = {
  flows: Readonly<ReactNode>;
};

export const UserGameSettings: FC<UserGameSettings> = ({ flows }) => {
  return (
    <div className='max-desktop-xs:w-full flex w-fit flex-col gap-10 pt-10'>
      <div className='max-desktop-xs:items-center flex w-full flex-col gap-2.5'>
        <h2 className='text-lg font-semibold'>Ваше имя в игре:</h2>
        <div className='flex flex-row items-center gap-2.5'>
          <p className='font-medium'>Татьяна</p>
          <div className='size-fit rounded-full border border-[#D9D9D9] bg-white p-2.5'>
            <ChangeIcon className='fill-uiActiveBlue' />
          </div>
        </div>
      </div>
      {flows}
    </div>
  );
};
