import { CameraPreview } from '@/modules/video-hub/lobby/features/camera-preview';
import { UserGameSettings } from '@/modules/video-hub/lobby/flow/user-game-settings';
import type { FC } from 'react';
import { DeviceStatusChecker } from './features/device-status-checker';
import { GameButton } from './features/game-button';

type LobbyModuleProps = {
  roomId: string;
  gameType: string;
};

const Description = () => (
  <div className='flex max-w-175 flex-col gap-4 text-center'>
    <h1 className='text-4xl font-medium'>Подключиться к игре</h1>
    <p className='text-lg font-normal'>Проверьте камеру и звук перед началом. Убедитесь, что вас хорошо видно и слышно.</p>
  </div>
);

export const LobbyModule: FC<LobbyModuleProps> = ({ roomId, gameType }) => {
  return (
    <div className='m-auto flex w-full flex-col items-center justify-center gap-5'>
      <Description />
      <div className='max-desktop-xs:flex-col flex w-full flex-row justify-center gap-5 pt-2.5'>
        <CameraPreview />
        <UserGameSettings
          flows={
            <div className='max-desktop-xs:items-center flex w-full flex-col gap-2.5'>
              <h2 className='max-desktop-xs:text-center text-lg font-semibold'>Ваша фишка в игре:</h2>
              <div className='flex flex-row items-center gap-2.5'>ffff</div>
            </div>
          }
        />
      </div>
      <DeviceStatusChecker />
      <GameButton className='mt-10 h-8 w-75' roomId={roomId} gameType={gameType} />
    </div>
  );
};
