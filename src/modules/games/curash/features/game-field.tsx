'use client';
import Curash from '@assets/img/curashImg.png';
import CoinIco from '@assets/svg/trick-curash.svg';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';

export const GameField = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div className='relative h-full' ref={constraintsRef}>
      <Image src={Curash} alt='ntf' className='aspect-[689/1369] h-full w-full object-contain' />
      <motion.div drag dragConstraints={constraintsRef} dragElastic={0} dragMomentum={false} className='absolute top-6 left-6 cursor-pointer'>
        <CoinIco />
      </motion.div>
    </motion.div>
  );
};
