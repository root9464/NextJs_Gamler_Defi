'use client';
import { socketAtom } from '@/modules/video/scene/store/socket';
import Curash from '@assets/img/curashImg.png';
import CoinIco from '@assets/svg/trick-curash.svg';
import { useAtomValue } from 'jotai';
import { motion, useMotionValue } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';

export const GameField = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const socketManager = useAtomValue(socketAtom);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleDrag = () => {
    console.log('X:', x.get(), 'Y:', y.get());
    socketManager.moveToken({ x: x.get(), y: y.get() });
  };

  return (
    <motion.div className='relative h-full' ref={constraintsRef}>
      <Image src={Curash} alt='ntf' className='aspect-[689/1369] h-full w-full object-contain' />
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0}
        dragMomentum={false}
        onDrag={handleDrag}
        style={{ x, y }}
        className='absolute top-6 left-6 h-12 w-12 cursor-pointer'>
        <CoinIco />
      </motion.div>
    </motion.div>
  );
};
