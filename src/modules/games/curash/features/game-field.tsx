'use client';

import type { Player } from '@/modules/video/scene/store/players';
import { socketAtom } from '@/modules/video/scene/store/socket';
import Curash from '@assets/img/curashImg.png';
import CoinIco from '@assets/svg/trick-curash.svg';
import { useAtomValue } from 'jotai';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface Token {
  position: {
    x: number;
    y: number;
  };
}

interface SocketPayload {
  position: {
    x: number | string;
    y: number | string;
  };
}

interface FullStatePayload {
  players: Player[];
  token?: SocketPayload;
}

const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));

const round = (value: number, precision: number = 100000): number => Math.round(value * precision) / precision;

const normalizeToken = (raw: SocketPayload): Token => {
  const toNumber = (value: number | string): number => (typeof value === 'number' ? value : parseFloat(value) || 0);

  const x = round(clamp(toNumber(raw.position.x), 0, 1));
  const y = round(clamp(toNumber(raw.position.y), 0, 1));

  return { position: { x, y } };
};

const calculateRelativePosition = (event: PointerEvent, rect: DOMRect): { x: number; y: number } => {
  const relativeX = (event.clientX - rect.left) / rect.width;
  const relativeY = (event.clientY - rect.top) / rect.height;
  return {
    x: round(clamp(relativeX, 0, 1)),
    y: round(clamp(relativeY, 0, 1)),
  };
};

export const GameField = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const socketManager = useAtomValue(socketAtom);
  const [token, setToken] = useState<Token>({ position: { x: 0, y: 0 } });
  const draggingRef = useRef(false);

  useEffect(() => {
    if (!socketManager) return;

    const handleFullState = (payload: FullStatePayload) => {
      console.log('Full state received:', payload);
      if (payload.token) {
        setToken(normalizeToken(payload.token));
      }
    };

    const handleTokenMoved = (payload: SocketPayload) => {
      console.log('Token moved to:', payload.position);
      setToken(normalizeToken(payload));
    };

    const unsubscribeFullState = socketManager.on('full_state', handleFullState);
    const unsubscribeTokenMoved = socketManager.on('token_moved', handleTokenMoved);

    return () => {
      unsubscribeFullState();
      unsubscribeTokenMoved();
    };
  }, [socketManager]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!draggingRef.current || !constraintsRef.current) return;

      const rect = constraintsRef.current.getBoundingClientRect();
      const { x, y } = calculateRelativePosition(event, rect);
      console.log('Dragging token to relative position:', { x, y });
      console.log('Dragging token to absolute position:', {
        x: event.clientX,
        y: event.clientY,
      });
      setToken({ position: { x, y } });
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!draggingRef.current || !constraintsRef.current) return;

      draggingRef.current = false;
      const rect = constraintsRef.current.getBoundingClientRect();
      const { x, y } = calculateRelativePosition(event, rect);
      console.log('Dragging token to relative position:', { x, y });
      console.log('Dragging token to absolute position:', {
        x: event.clientX,
        y: event.clientY,
      });
      setToken({ position: { x, y } });

      if (socketManager?.gameController?.moveToken) {
        socketManager.gameController.moveToken({ x, y });
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [socketManager]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!constraintsRef.current) return;

    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  return (
    <motion.div className='relative h-full w-[800px]' ref={constraintsRef}>
      <Image src={Curash} alt='Game background' className='aspect-[689/1369] h-full w-full object-contain' />
      <motion.div
        style={{
          left: `${token.position.x * 100}%`,
          top: `${token.position.y * 100}%`,
        }}
        className='absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer'
        onPointerDown={handlePointerDown}>
        <CoinIco />
      </motion.div>
    </motion.div>
  );
};
