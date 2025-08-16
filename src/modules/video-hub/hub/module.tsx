'use client';
import { idRoom } from '@/modules/video-hub/lobby/store/hub-id';
import Curash from '@assets/img/curashImg.png';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { WebCamera } from './features/web-camera';
import { WebWrapper } from './features/web-wrapper';

export const HubModule = () => {
  const currentId = useAtomValue(idRoom);
  console.log(currentId, 'roomId');

  return (
    <div className='flex h-screen w-full gap-[25px] bg-black px-[20px] py-[25px] text-white'>
      <div className='flex w-[688px] flex-col gap-[20px]'>
        <div className='flex w-[688px] justify-between'>
          <div className='h-[200px] w-[333px] rounded-[11px] border-1 border-[#183410] bg-[#171918]'></div>
          <WebCamera />
        </div>
        <div>
          <Image src={Curash} alt='ntf' />
        </div>
      </div>
      <div className='flex flex-wrap content-start gap-[24px]'>
        {Array.from({ length: 4 }).map((_, index) => (
          <WebWrapper key={index} />
        ))}
      </div>
    </div>
  );
};
