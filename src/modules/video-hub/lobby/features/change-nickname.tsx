'use client';
import ChangeIco from '@/assets/svg/change.svg';
import { useState } from 'react';

export const ChangeNickname = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='flex w-[270px] flex-col gap-10 pt-10'>
      <h1 className='text-[18px] font-medium text-[#3f4149]'>Ваше имя в игре:</h1>
      <div className='flex items-center gap-[10px] pt-5'>
        {open ? (
          <div className='flex gap-[5px]'>
            <input
              type='text'
              placeholder='введите новое имя'
              className='h-6 rounded-[3px] border-1 border-black pl-[5px] text-[14px] outline-0'
            />
            <button className='h-6 cursor-pointer rounded-[3px] bg-[#1677ff] px-[7px] text-[14px] text-white hover:bg-[#4096ff]'>
              сохранить
            </button>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className='h-6 cursor-pointer rounded-[3px] border-1 border-black bg-white px-[7px] text-[14px] text-black hover:border-[#1677ff] hover:text-[#1677ff]'>
              отмена
            </button>
          </div>
        ) : (
          <div className='flex items-center gap-[5px]'>
            <p className='text-[18px]'>morteit</p>
            <div
              onClick={() => setOpen((prev) => !prev)}
              className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-[1px] border-[#D9D9D9] text-blue-400 hover:text-black'>
              <ChangeIco className='fill-[#1890FF]' />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
