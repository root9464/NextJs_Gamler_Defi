import { CameraPreview } from '@/modules/video-hub/lobby/features/camera-preview';
import { UserGameSettings } from '@/modules/video-hub/lobby/flow/user-game-settings';
import type { FC } from 'react';
import { getUserGameFlow } from './adapters/game-type';
import { DeviceStatusChecker } from './features/device-status-checker';
import { GameButton } from './features/game-button';

type LobbyModuleProps = {
  roomId: string;
  gameType: 'curash' | 'acceptence';
};

const Description = () => (
  <div className='flex max-w-175 flex-col gap-4 text-center'>
    <h1 className='text-4xl font-medium'>Подключиться к игре</h1>
    <p className='text-lg font-normal'>Проверьте камеру и звук перед началом. Убедитесь, что вас хорошо видно и слышно.</p>
  </div>
);

export const LobbyModule: FC<LobbyModuleProps> = ({ roomId, gameType }) => {
  const gameFlow = getUserGameFlow(gameType);
  return (
    <div className='m-auto flex w-full flex-col items-center justify-center gap-5'>
      <Description />
      <div className='max-desktop-xs:flex-col flex w-full flex-row justify-center gap-5 pt-2.5'>
        <CameraPreview />
        <UserGameSettings flows={gameFlow} />
      </div>
      <DeviceStatusChecker />
      <GameButton className='mt-10 h-8 w-75' roomId={roomId} gameType={gameType} />
    </div>
  );
};
