import { SelectedCard } from '@/modules/games/curash/features/selected-card';
import { ShowCardModal } from '@/modules/games/curash/features/show-card-modal';
import { UserSelectCard } from '@/modules/games/curash/features/user-select-card';
import { RemoteUsersCamera } from '@/modules/video/scene/flow/remote-users-camera';
import { cn } from '@/shared/utils/tw.utils';
import type { FC, ReactNode } from 'react';
import type { ControlPanelProps } from './flow/control-panel';
import { ControlPanel } from './flow/control-panel';
import { SocketInterface } from './flow/socket-interface';

type SceneModuleProps = {
  controlPanel: ControlPanelProps;
  gameField: Readonly<ReactNode>;
  cardHolder: FC<{ userId: string }>;
  eventsModals?: Readonly<ReactNode>;
  sessionId: string;
};

export const SceneModule: FC<SceneModuleProps> = ({ controlPanel, gameField, cardHolder, eventsModals, sessionId }) => {
  return (
    <SocketInterface sessionId={sessionId}>
      <div className='flex h-min w-full flex-row gap-[25px] bg-black px-5 py-[25px] text-white'>
        <div className='max-desktop-xs:w-full relative flex h-fit w-[688px] flex-col gap-5'>
          <div className='max-desktop-xs:hidden flex w-full justify-between gap-6'>
            <ControlPanel {...controlPanel} />
            <div className='w-[332px]' />
          </div>

          {/* <MobileHeader /> */}

          {gameField}

          <div
            className={cn(
              'sticky bottom-0 z-[1] h-25 w-full px-4 py-3',
              'bg-neutral-800/50 backdrop-blur-[120px]',
              'rounded-tl-2xl rounded-tr-2xl border border-white/10',
              'min-[1100px]:hidden',
            )}></div>
        </div>
        <RemoteUsersCamera cardHolder={cardHolder} />
      </div>
      <ShowCardModal />
      <SelectedCard />
      <UserSelectCard />
      {eventsModals}
    </SocketInterface>
  );
};
