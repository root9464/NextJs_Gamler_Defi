'use client';
import { socketAtom } from '@/modules/video/scene/store/socket';
import Curash from '@assets/img/curashImg.png';
import CoinIco from '@assets/svg/trick-curash.svg';
import { useAtomValue } from 'jotai';
import type { PanInfo } from 'motion/react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';

export const GameField = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const socketManager = useAtomValue(socketAtom);

  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    console.log('X:', info.point.x, 'Y:', info.point.y);
    socketManager.gameController.moveToken({
      x: info.point.x,
      y: info.point.y,
    });
  };

  return (
    <motion.div className='relative h-full' ref={constraintsRef}>
      <Image src={Curash} alt='ntf' className='aspect-[689/1369] h-full w-full object-contain' />
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleDrag}
        className='absolute top-6 left-6 h-12 w-12 cursor-pointer'>
        <CoinIco />
      </motion.div>
    </motion.div>
  );
};
