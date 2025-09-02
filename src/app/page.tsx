'use client';
import { GameField } from '@/modules/games/curash/features/game-field';
import { OkdSocketInterface } from '@/modules/video/scene/depricated/old-socket-interface';

export default function Home() {
  return (
    <>
      <OkdSocketInterface sessionId='125'>
        <GameField />
      </OkdSocketInterface>
    </>
  );
}
