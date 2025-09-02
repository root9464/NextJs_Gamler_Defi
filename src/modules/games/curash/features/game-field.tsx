'use client';
import type { Player } from '@/modules/video/scene/store/players';
import { playersAtom } from '@/modules/video/scene/store/players';
import { socketAtom } from '@/modules/video/scene/store/socket';
import Curash from '@assets/img/curashImg.png';
import CoinIco from '@assets/svg/trick-curash.svg';
import { useAtom, useAtomValue } from 'jotai';
import type { PanInfo } from 'motion/react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export const GameField = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const socketManager = useAtomValue(socketAtom);
  const [players, setPlayers] = useAtom(playersAtom);

  useEffect(() => {
    const handlePlayerJoined = (payload: { player: Player }) => {
      console.log(`Player joined: ${payload.player.name} (ID: ${payload.player.id})`);
      setPlayers((prev) => [...prev, payload.player]);
    };

    const handlePlayerLeft = (payload: { playerId: string }) => {
      console.log(`Player left: ID ${payload.playerId}`);
      setPlayers((prev) => prev.filter((player) => player.id !== payload.playerId));
    };

    const handleTokenMoved = (payload: { playerId: string; position: { x: number; y: number } }) => {
      console.log(`Player ${payload.playerId} moved token to X: ${payload.position.x}, Y: ${payload.position.y}`);
      setPlayers((prev) => prev.map((player) => (player.id === payload.playerId ? { ...player, position: payload.position } : player)));
    };

    const unsubscribeJoined = socketManager.on('player_joined', handlePlayerJoined);
    const unsubscribeLeft = socketManager.on('player_left', handlePlayerLeft);
    const unsubscribeTokenMoved = socketManager.on('token_moved', handleTokenMoved);

    return () => {
      unsubscribeJoined();
      unsubscribeLeft();
      unsubscribeTokenMoved();
    };
  }, [socketManager, setPlayers]);

  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    console.log(`Dragging token to X: ${info.point.x}, Y: ${info.point.y}`);
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
