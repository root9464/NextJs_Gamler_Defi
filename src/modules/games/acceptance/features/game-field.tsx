'use client';
import Curash from '@assets/img/acceptenceImg.png';
import RocketIco from '@assets/svg/rocket.svg';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';

export const GameField = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
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
  );
};
