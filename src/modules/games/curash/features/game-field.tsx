'use client';

import { currentUserIdAtom, playersAtom, updatePlayerPositionAtom, type Player } from '@/modules/video/scene/store/players';
import { socketAtom } from '@/modules/video/scene/store/socket';
import Curash from '@assets/img/curashImg.png';
import CoinIco from '@assets/svg/trick-curash.svg';
import { useAtomValue, useSetAtom } from 'jotai';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface SocketPayload {
  position: {
    x: number | string;
    y: number | string;
  };
}

interface FullStatePayload {
  players: Player[];
}

const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));
const round = (value: number, precision: number = 100000): number => Math.round(value * precision) / precision;
const toNumber = (value: number | string): number => (typeof value === 'number' ? value : parseFloat(value) || 0);

const normalizePosition = (raw: SocketPayload['position']): { x: number; y: number } => {
  return {
    x: round(clamp(toNumber(raw.x), 0, 1)),
    y: round(clamp(toNumber(raw.y), 0, 1)),
  };
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
  const currentUserId = useAtomValue(currentUserIdAtom);
  const players = useAtomValue(playersAtom);
  const updatePlayerPosition = useSetAtom(updatePlayerPositionAtom);
  const draggingRef = useRef<string | null>(null);
  const [localPosition, setLocalPosition] = useState<{ [key: string]: { x: number; y: number } }>({});

  useEffect(() => {
    if (!socketManager) return;

    const handleFullState = (payload: FullStatePayload) => {
      console.log('Full state received:', payload);
      setLocalPosition({});
    };

    const handleTokenMoved = (payload: { playerId: string; position: { x: number; y: number } }) => {
      console.log(`Token moved for player ${payload.playerId} to:`, payload.position);
      if (payload.playerId !== currentUserId) {
        updatePlayerPosition({ id: payload.playerId, position: normalizePosition(payload.position) });
      }
    };

    const unsubscribeFullState = socketManager.on('full_state', handleFullState);
    const unsubscribeTokenMoved = socketManager.on('token_moved', handleTokenMoved);

    return () => {
      unsubscribeFullState();
      unsubscribeTokenMoved();
    };
  }, [socketManager, updatePlayerPosition, currentUserId]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!draggingRef.current || !constraintsRef.current || draggingRef.current !== currentUserId) return;

      const rect = constraintsRef.current.getBoundingClientRect();
      const { x, y } = calculateRelativePosition(event, rect);
      console.log('Dragging token to relative position:', { x, y });
      console.log('Dragging token to absolute position:', { x: event.clientX, y: event.clientY });

      setLocalPosition((prev) => ({ ...prev, [currentUserId!]: { x, y } }));
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!draggingRef.current || !constraintsRef.current || draggingRef.current !== currentUserId) return;

      draggingRef.current = null;
      const rect = constraintsRef.current.getBoundingClientRect();
      const { x, y } = calculateRelativePosition(event, rect);
      console.log('Dropped token at relative position:', { x, y });
      console.log('Dropped token at absolute position:', { x: event.clientX, y: event.clientY });

      setLocalPosition((prev) => ({ ...prev, [currentUserId!]: { x, y } }));
      updatePlayerPosition({ id: currentUserId!, position: { x, y } });
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
  }, [socketManager, currentUserId, updatePlayerPosition]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>, playerId: string) => {
    if (!constraintsRef.current || playerId !== currentUserId) return;

    draggingRef.current = playerId;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  return (
    <motion.div className='relative h-full w-[800px]' ref={constraintsRef}>
      <Image src={Curash} alt='Game background' className='aspect-[689/1369] h-full w-full object-contain' />
      {players.map((player) => (
        <motion.div
          key={player.id}
          style={{
            left: `${(localPosition[player.id] || player.position).x * 100}%`,
            top: `${(localPosition[player.id] || player.position).y * 100}%`,
          }}
          className='absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer'
          onPointerDown={(e) => handlePointerDown(e, player.id)}>
          <CoinIco />
        </motion.div>
      ))}
    </motion.div>
  );
};
