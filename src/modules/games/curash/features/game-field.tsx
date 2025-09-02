'use client';
import type { Player } from '@/modules/video/scene/store/players';
import { socketAtom } from '@/modules/video/scene/store/socket';
import Curash from '@assets/img/curashImg.png';
import CoinIco from '@assets/svg/trick-curash.svg';
import { useAtomValue } from 'jotai';
import type { PanInfo } from 'motion/react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface Token {
  position: { x: number; y: number };
}

export const GameField = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const socketManager = useAtomValue(socketAtom);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [token, setToken] = useState<Token>({ position: { x: 0, y: 0 } });

  useEffect(() => {
    const updateDimensions = () => {
      if (constraintsRef.current) {
        const rect = constraintsRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
        });
        console.log('Dimensions updated:', rect.width, rect.height);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const handleFullState = (payload: { players: Player[]; token?: Token }) => {
      console.log('Full state received:', payload);
      if (payload.token) {
        setToken(payload.token);
      }
    };

    const handleTokenMoved = (payload: { position: { x: number; y: number } }) => {
      console.log('Token moved to:', payload.position);
      setToken({ position: payload.position });
    };

    const unsubscribeFullState = socketManager.on('full_state', handleFullState);
    const unsubscribeTokenMoved = socketManager.on('token_moved', handleTokenMoved);

    return () => {
      unsubscribeFullState();
      unsubscribeTokenMoved();
    };
  }, [socketManager]);

  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!dimensions.width || !dimensions.height || !constraintsRef.current) return;

    const rect = constraintsRef.current.getBoundingClientRect();
    const relativeX = (info.point.x - rect.left) / rect.width;
    const relativeY = (info.point.y - rect.top) / rect.height;

    console.log('Dragging token to relative position:', { x: relativeX, y: relativeY });
    console.log('Dragging token to absolute position:', { x: info.point.x, y: info.point.y });
    socketManager.gameController.moveToken({
      x: relativeX,
      y: relativeY,
    });
  };

  return (
    <motion.div className='relative h-full w-[800px]' ref={constraintsRef}>
      <Image src={Curash} alt='Game background' className='aspect-[689/1369] h-full w-full object-contain' />
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={(e, i) => handleDrag(e, i)}
        style={{
          x: token.position.x * dimensions.width,
          y: token.position.y * dimensions.height,
        }}
        className='absolute h-12 w-12 cursor-pointer'>
        <CoinIco />
      </motion.div>
    </motion.div>
  );
};
