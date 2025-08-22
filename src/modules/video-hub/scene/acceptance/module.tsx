import { Camera } from '@/components/slices/camera';
import { ControlPanelAcceptance } from './features/control-panel';
import { GameField } from './features/game-field';
import { WebWrapper } from './slices/wrapper';

export const AcceptanceModule = () => {
  return (
    <div className='flex h-max w-full gap-[25px] bg-black px-5 py-[25px] text-white'>
      <div className='flex w-[688px] flex-col gap-5'>
        <div className='flex w-[688px] justify-between'>
          <ControlPanelAcceptance />
          <Camera />
        </div>
        <GameField />
      </div>
      <div className='flex flex-wrap content-start gap-6'>
        {Array.from({ length: 4 }).map((_, index) => (
          <WebWrapper key={index} />
        ))}
      </div>
    </div>
  );
};
