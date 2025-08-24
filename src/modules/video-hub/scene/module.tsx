import { UserCameraFrame } from '@/components/slices/user-camera-frame';
import { cn } from '@/shared/utils/tw.utils';
import type { FC, ReactElement, ReactNode } from 'react';
import type { ControlPanelProps } from './flow/control-panel';
import { ControlPanel } from './flow/control-panel';

type SceneModuleProps = {
  controlPanel: ReactElement<ControlPanelProps>;
  gameField: Readonly<ReactNode>;
  UserWrapper: FC;
};

export const SceneModule: FC<SceneModuleProps> = ({ controlPanel, gameField, UserWrapper }) => {
  return (
    <div className='flex h-min w-full flex-row gap-[25px] bg-black px-5 py-[25px] text-white'>
      <div className='relative flex h-fit w-[688px] flex-col gap-5 max-[1100px]:w-full'>
        <div className='flex w-full justify-between max-[1100px]:hidden'>
          <ControlPanel {...controlPanel.props} />
          <UserCameraFrame />
        </div>

        <div
          className={cn(
            'sticky top-0 z-[1] h-60 w-full px-4 py-3',
            'bg-neutral-800/50 backdrop-blur-[120px]',
            'rounded-br-2xl rounded-bl-2xl border border-white/10',
            'min-[1100px]:hidden',
          )}>
          header
        </div>

        {gameField}

        <div
          className={cn(
            'sticky bottom-0 z-[1] h-25 w-full px-4 py-3',
            'bg-neutral-800/50 backdrop-blur-[120px]',
            'rounded-tl-2xl rounded-tr-2xl border border-white/10',
            'min-[1100px]:hidden',
          )}>
          footer
        </div>
      </div>
      <div className='flex max-h-[1587px] w-full flex-wrap content-start gap-6 overflow-y-auto max-[1100px]:hidden'>
        {/*мап массива где видеокамера и карточки*/}
        {Array.from({ length: 34 }).map((_, index) => (
          <UserWrapper key={index} />
        ))}
      </div>
    </div>
  );
};
