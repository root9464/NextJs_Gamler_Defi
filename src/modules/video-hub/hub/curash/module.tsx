'use client';
import { idRoom } from '@/modules/video-hub/lobby/store/hub-id';
import Curash from '@assets/img/curashImg.png';
import CoinIco from '@assets/svg/coin.svg';
import { useAtomValue } from 'jotai';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';
import { ControlPanelCurash } from './features/control-panel';
import { WebCameraCurash } from './features/web-camera';
import { WebWrapperCurash } from './features/web-wrapper';

export const CurashModule = () => {
  const currentId = useAtomValue(idRoom);
  console.log(currentId, 'roomId');
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <div className='flex h-max w-full gap-[25px] bg-black px-5 py-[25px] text-white'>
      <div className='flex w-[688px] flex-col gap-5'>
        <div className='flex w-[688px] justify-between'>
          <ControlPanelCurash />
          <WebCameraCurash />
        </div>
        <motion.div className='relative h-full' ref={constraintsRef}>
          <Image src={Curash} alt='ntf' className='h-full' />
          <motion.div
            drag
            dragConstraints={constraintsRef}
            dragElastic={0}
            dragMomentum={false}
            className='absolute top-6 left-6 cursor-pointer'>
            <CoinIco />
          </motion.div>
        </motion.div>
      </div>
      <div className='flex flex-wrap content-start gap-6'>
        {Array.from({ length: 4 }).map((_, index) => (
          <WebWrapperCurash key={index} />
        ))}
      </div>
    </div>
  );
};
