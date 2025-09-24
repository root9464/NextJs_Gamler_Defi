'use client';

import { currentUserIdAtom, playersAtom, updatePlayerPositionAtom, type Player } from '@/modules/video/scene/store/players';
import { socketAtom } from '@/modules/video/scene/store/socket';
import Acceptance from '@assets/img/acceptenceImg.png';
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

const X_OFFSET = 0.1;
const INITIAL_Y = 0.5;

const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));
const round = (value: number, precision: number = 100000): number => Math.round(value * precision) / precision;
const toNumber = (value: number | string): number => (typeof value === 'number' ? value : parseFloat(value) || 0);

const normalizePosition = (raw: SocketPayload['position']): { x: number; y: number } => {
  return {
    x: round(clamp(toNumber(raw.x), 0, 1)),
    y: round(clamp(toNumber(raw.y), 0, 1)),
  };
};

const calculateRelativePosition = (clientX: number, clientY: number, rect: DOMRect): { x: number; y: number } => {
  const relativeX = (clientX - rect.left) / rect.width;
  const relativeY = (clientY - rect.top) / rect.height;
  return {
    x: round(clamp(relativeX, 0, 1)),
    y: round(clamp(relativeY, 0, 1)),
  };
};

const assignInitialPositions = (players: Player[]): Player[] => {
  return players.map((player, index) => ({
    ...player,
    position: {
      x: round(clamp(X_OFFSET * (index + 1), 0, 1)),
      y: INITIAL_Y,
    },
  }));
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
      const updatedPlayers = assignInitialPositions(payload.players);
      updatedPlayers.forEach((player) => {
        updatePlayerPosition({ id: player.id, position: player.position });
        if (socketManager.gameController?.moveToken) {
          socketManager.gameController.moveToken(player.position);
        }
      });
      setLocalPosition({});
    };

    const handleTokenMoved = (payload: { playerId: string; position: { x: number; y: number } }) => {
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

  const handleMove = (clientX: number, clientY: number) => {
    if (!draggingRef.current || !constraintsRef.current || draggingRef.current !== currentUserId) return;

    const rect = constraintsRef.current.getBoundingClientRect();
    const { x, y } = calculateRelativePosition(clientX, clientY, rect);
    setLocalPosition((prev) => ({ ...prev, [currentUserId!]: { x, y } }));
  };

  const handleEnd = (clientX: number, clientY: number) => {
    if (!draggingRef.current || !constraintsRef.current || draggingRef.current !== currentUserId) return;

    draggingRef.current = null;
    const rect = constraintsRef.current.getBoundingClientRect();
    const { x, y } = calculateRelativePosition(clientX, clientY, rect);
    setLocalPosition((prev) => ({ ...prev, [currentUserId!]: { x, y } }));
    updatePlayerPosition({ id: currentUserId!, position: { x, y } });

    if (socketManager?.gameController?.moveToken) {
      socketManager.gameController.moveToken({ x, y });
    }
  };

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      handleMove(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      if (event.touches.length > 0) {
        handleMove(event.touches[0].clientX, event.touches[0].clientY);
      }
    };

    const handlePointerUp = (event: PointerEvent) => {
      handleEnd(event.clientX, event.clientY);
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (event.changedTouches.length > 0) {
        handleEnd(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [socketManager, currentUserId, updatePlayerPosition]);

  const handleStart = (clientX: number, clientY: number, playerId: string) => {
    if (!constraintsRef.current || playerId !== currentUserId) return;

    draggingRef.current = playerId;
    handleMove(clientX, clientY);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>, playerId: string) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    handleStart(event.clientX, event.clientY, playerId);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>, playerId: string) => {
    if (event.touches.length > 0) {
      handleStart(event.touches[0].clientX, event.touches[0].clientY, playerId);
    }
  };

  return (
    <motion.div className='relative h-full w-full' ref={constraintsRef}>
      <Image src={Acceptance} alt='Game background' className='aspect-square h-full w-full object-contain' />
      {players.map((player) => (
        <motion.div
          key={player.id}
          style={{
            left: `${(localPosition[player.id] || player.position).x * 100}%`,
            top: `${(localPosition[player.id] || player.position).y * 100}%`,
          }}
          className='absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer touch-none'
          onPointerDown={(e) => handlePointerDown(e, player.id)}
          onTouchStart={(e) => handleTouchStart(e, player.id)}>
          <CoinIco />
          <div className='flex items-center justify-center rounded-[5px] bg-black/60'>
            <p className='text-white'>{player.id}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
