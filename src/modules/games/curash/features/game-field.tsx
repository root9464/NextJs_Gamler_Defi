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
  position: { x: number; y: number };
}

export const GameField = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const socketManager = useAtomValue(socketAtom);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [token, setToken] = useState<Token>({ position: { x: 0, y: 0 } });
  const draggingRef = useRef(false);

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
    if (!socketManager) return;

    const toNumber = (v: any) => {
      if (typeof v === 'number') return v;
      if (typeof v === 'string') {
        const n = parseFloat(v);
        return Number.isFinite(n) ? n : 0;
      }
      return 0;
    };

    const normalizeToken = (raw: any): Token => {
      const x = toNumber(raw?.position?.x ?? raw?.x ?? 0);
      const y = toNumber(raw?.position?.y ?? raw?.y ?? 0);
      const clamp = (n: number) => Math.max(0, Math.min(1, n));
      const round = (n: number) => Math.round(n * 100000) / 100000;
      return { position: { x: round(clamp(x)), y: round(clamp(y)) } };
    };

    const handleFullState = (payload: { players: Player[]; token?: any }) => {
      console.log('Full state received:', payload);
      if (payload.token) {
        setToken(normalizeToken(payload.token));
      }
    };

    const handleTokenMoved = (payload: { position: { x: any; y: any } } | any) => {
      console.log('Token moved to:', payload.position ?? payload);
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
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      if (!constraintsRef.current) return;
      const rect = constraintsRef.current.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left) / rect.width;
      const relativeY = (e.clientY - rect.top) / rect.height;
      console.log('Dragging token to relative position:', { x: relativeX, y: relativeY });
      console.log('Dragging token to absolute position:', { x: e.clientX, y: e.clientY });
      const clamp = (n: number) => Math.max(0, Math.min(1, n));
      const round = (n: number) => Math.round(n * 100000) / 100000;
      const nx = round(clamp(relativeX));
      const ny = round(clamp(relativeY));
      setToken({ position: { x: nx, y: ny } });
    };

    const onUp = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      if (!constraintsRef.current) return;
      const rect = constraintsRef.current.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left) / rect.width;
      const relativeY = (e.clientY - rect.top) / rect.height;
      console.log('Dragging token to relative position:', { x: relativeX, y: relativeY });
      console.log('Dragging token to absolute position:', { x: e.clientX, y: e.clientY });
      const clamp = (n: number) => Math.max(0, Math.min(1, n));
      const round = (n: number) => Math.round(n * 100000) / 100000;
      const nx = round(clamp(relativeX));
      const ny = round(clamp(relativeY));
      setToken({ position: { x: nx, y: ny } });
      if (socketManager?.gameController?.moveToken) {
        socketManager.gameController.moveToken({ x: nx, y: ny });
      }
    };

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [socketManager]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!constraintsRef.current) return;
    draggingRef.current = true;
    (e.target as Element)?.setPointerCapture?.((e as unknown as PointerEvent).pointerId);
    const onMove = (ev: PointerEvent) => {
      if (!draggingRef.current) return;
      if (!constraintsRef.current) return;
      const rect = constraintsRef.current.getBoundingClientRect();
      const relativeX = (ev.clientX - rect.left) / rect.width;
      const relativeY = (ev.clientY - rect.top) / rect.height;
      console.log('Dragging token to relative position:', { x: relativeX, y: relativeY });
      console.log('Dragging token to absolute position:', { x: ev.clientX, y: ev.clientY });
      const clamp = (n: number) => Math.max(0, Math.min(1, n));
      const round = (n: number) => Math.round(n * 100000) / 100000;
      const nx = round(clamp(relativeX));
      const ny = round(clamp(relativeY));
      setToken({ position: { x: nx, y: ny } });
    };
    const onUp = (ev: PointerEvent) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      if (!constraintsRef.current) return;
      const rect = constraintsRef.current.getBoundingClientRect();
      const relativeX = (ev.clientX - rect.left) / rect.width;
      const relativeY = (ev.clientY - rect.top) / rect.height;
      console.log('Dragging token to relative position:', { x: relativeX, y: relativeY });
      console.log('Dragging token to absolute position:', { x: ev.clientX, y: ev.clientY });
      const clamp = (n: number) => Math.max(0, Math.min(1, n));
      const round = (n: number) => Math.round(n * 100000) / 100000;
      const nx = round(clamp(relativeX));
      const ny = round(clamp(relativeY));
      setToken({ position: { x: nx, y: ny } });
      if (socketManager?.gameController?.moveToken) {
        socketManager.gameController.moveToken({ x: nx, y: ny });
      }
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
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
        onPointerDown={onPointerDown}>
        <CoinIco />
      </motion.div>
    </motion.div>
  );
};
