'use client';
import { idRoom } from '@/modules/video-hub/lobby/store/hub-id';
import Curash from '@assets/img/acceptenceImg.png';
import RocketIco from '@assets/svg/rocket.svg';
import { useAtomValue } from 'jotai';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';
import { ControlPanelAcceptance } from './features/control-panel';
import { WebCamera } from './features/web-camera';
import { WebWrapper } from './features/web-wrapper';

export const AcceptanceModule = () => {
  const currentId = useAtomValue(idRoom);
  console.log(currentId, 'roomId');
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <div className='flex h-max w-full gap-[25px] bg-black px-[20px] py-[25px] text-white'>
      <div className='flex w-[688px] flex-col gap-[20px]'>
        <div className='flex w-[688px] justify-between'>
          <ControlPanelAcceptance />
          <WebCamera />
        </div>
        <motion.div className='relative h-full' ref={constraintsRef}>
          <Image src={Curash} alt='ntf' className='h-full' />
          <motion.div
            drag
            dragConstraints={constraintsRef}
            dragElastic={0}
            dragMomentum={false}
            className='absolute top-6 left-6 flex h-12 w-fit cursor-pointer items-center gap-2 rounded-[24px] border-1 border-[#9D16B8] bg-white px-3 py-2'>
            <RocketIco />
            <p className='w-max text-sm text-black'>Алина Минькеева</p>
          </motion.div>
        </motion.div>
      </div>
      <div className='flex flex-wrap content-start gap-[24px]'>
        {Array.from({ length: 4 }).map((_, index) => (
          <WebWrapper key={index} />
        ))}
      </div>
    </div>
  );
};
