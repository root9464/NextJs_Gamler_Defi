'use client';
import Curash from '@assets/img/curashImg.png';
import CoinIco from '@assets/svg/trick-curash.svg';
import { useAtomValue } from 'jotai';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';
import { trickAtom } from '../store/trick-store';

export const GameField = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const value = useAtomValue(trickAtom);

  return (
    <motion.div className='relative h-full' ref={constraintsRef}>
      <Image src={Curash} alt='ntf' className='h-full' />
      <motion.div drag dragConstraints={constraintsRef} dragElastic={0} dragMomentum={false} className='absolute top-6 left-6 cursor-pointer'>
        <CoinIco
          className={`[--stop-color-1:${value.main}] [--stop-color-2:${value.highlight}] h-[59px] w-[53px] max-sm:h-[39px] max-sm:w-[33px]`}
        />
      </motion.div>
    </motion.div>
  );
};
