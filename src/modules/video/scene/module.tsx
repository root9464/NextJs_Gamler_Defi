import { UserCameraFrame } from '@/components/slices/user-camera-frame';
import { NotOwn } from '@/modules/games/curash/features/show-card-modal';
import { DiceResultModal } from '@/modules/games/curash/features/show-dice-modal';
import { cn } from '@/shared/utils/tw.utils';
import type { FC, ReactNode } from 'react';
import type { ControlPanelProps } from './flow/control-panel';
import { ControlPanel } from './flow/control-panel';
import { MobileHeader } from './flow/mobile-header';
import { SocketInterface } from './flow/socket-interface';

type SceneModuleProps = {
  controlPanel: ControlPanelProps;
  gameField: Readonly<ReactNode>;
  cardHolder?: Readonly<ReactNode>;

  sessionId: string;
};

export const SceneModule: FC<SceneModuleProps> = ({ controlPanel, gameField, cardHolder, sessionId }) => {
  return (
    <SocketInterface sessionId={sessionId}>
      <div className='flex h-min w-full flex-row gap-[25px] bg-black px-5 py-[25px] text-white'>
        <div className='max-desktop-xs:w-full relative flex h-fit w-[688px] flex-col gap-5'>
          <div className='max-desktop-xs:hidden flex w-full justify-between gap-6'>
            <ControlPanel {...controlPanel} />
            <UserCameraFrame />
          </div>

          <MobileHeader />

          {gameField}

          <div
            className={cn(
              'sticky bottom-0 z-[1] h-25 w-full px-4 py-3',
              'bg-neutral-800/50 backdrop-blur-[120px]',
              'rounded-tl-2xl rounded-tr-2xl border border-white/10',
              'min-[1100px]:hidden',
            )}></div>
        </div>
        <div className='max-desktop-xs:hidden flex max-h-[1587px] w-full flex-wrap content-start gap-6 overflow-y-auto'>
          {Array.from({ length: 34 }).map((_, index) => (
            <div className='flex h-[294px] w-[332px] flex-col gap-[25px]' key={index}>
              <UserCameraFrame />
              {cardHolder}
            </div>
          ))}
        </div>
        <NotOwn />
        <DiceResultModal />
      </div>
    </SocketInterface>
  );
};
