'use client';
import { idRoom } from '@/modules/video-hub/lobby/store/hub-id';
import Curash from '@assets/img/acceptenceImg.png';
import RocketIco from '@assets/svg/rocket.svg';
import { useAtomValue } from 'jotai';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';
import { ControlPanelAcceptance } from './features/control-panel';
import { WebCameraAcceptance } from './features/web-camera';
import { WebWrapper } from './features/web-wrapper';

export const AcceptanceModule = () => {
  const currentId = useAtomValue(idRoom);
  console.log(currentId, 'roomId');
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <div className='flex h-max w-full gap-[25px] bg-black px-5 py-[25px] text-white'>
      <div className='flex w-[688px] flex-col gap-5'>
        <div className='flex w-[688px] justify-between'>
          <ControlPanelAcceptance />
          <WebCameraAcceptance />
        </div>
        <motion.div className='relative h-full' ref={constraintsRef}>
          <Image src={Curash} alt='ntf' className='h-full' />
          <motion.div
            drag
            dragConstraints={constraintsRef}
            dragElastic={0}
            dragMomentum={false}
            className='rounded-6 absolute top-6 left-6 flex h-12 w-fit cursor-pointer items-center gap-2 border-1 border-[#9D16B8] bg-white px-3 py-2'>
            <RocketIco />
            <p className='w-max text-sm text-black'>Игрок 1</p>
          </motion.div>
        </motion.div>
      </div>
      <div className='flex flex-wrap content-start gap-6'>
        {Array.from({ length: 4 }).map((_, index) => (
          <WebWrapper key={index} />
        ))}
      </div>
    </div>
  );
};
