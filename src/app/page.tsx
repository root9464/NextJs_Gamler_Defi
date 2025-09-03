'use client';
import { ChangeDices } from '@/modules/games/curash/features/change-dices';
import { RollDices } from '@/modules/games/curash/features/roll-dices';
import { ThrownDice } from '@/modules/games/curash/slices/thrown-dice';
import { OldSocketInterface } from '@/modules/video/scene/depricated/old-socket-interface';

export default function Home() {
  return (
    <>
      <OldSocketInterface sessionId='125'>
        <div className='flex flex-row items-center gap-2.5'>
          <RollDices />
          <ChangeDices />
          <ThrownDice />
        </div>
      </OldSocketInterface>
    </>
  );
}
