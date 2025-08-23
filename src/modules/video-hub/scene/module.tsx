import { UserCameraFrame } from '@/components/slices/user-camera-frame';
import type { FC, ReactElement, ReactNode } from 'react';
import type { ControlPanelProps } from './flow/control-panel';
import { ControlPanel } from './flow/control-panel';

type GameModuleProps = {
  controlPanel: ReactElement<ControlPanelProps>;
  gameField: Readonly<ReactNode>;
  UserWrapper: FC;
};

export const GameModule: FC<GameModuleProps> = ({ controlPanel, gameField, UserWrapper }) => {
  return (
    <div className='flex h-max w-full gap-[25px] bg-black px-5 py-[25px] text-white'>
      <div className='flex w-[688px] flex-col gap-5'>
        <div className='flex w-[688px] justify-between'>
          <ControlPanel {...controlPanel.props} />
          <UserCameraFrame />
        </div>
        {gameField}
      </div>
      <div className='flex flex-wrap content-start gap-6'>
        {/*мап массива где видеокамера и карточки*/}
        {Array.from({ length: 4 }).map((_, index) => (
          <UserWrapper key={index} />
        ))}
      </div>
    </div>
  );
};
