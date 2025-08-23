import { CameraPreview } from '@/modules/video-hub/lobby/features/camera-preview';
import { ChangeNickname } from '@/modules/video-hub/lobby/features/change-nickname';
import type { FC } from 'react';
import { DeviceStatusChecker } from './features/device-status-checker';
import { GameButton } from './features/game-button';

type LobbyModuleProps = {
  roomId: string;
  gameType: string;
};

export const LobbyModule: FC<LobbyModuleProps> = ({ roomId, gameType }) => {
  console.log(roomId, gameType);
  return (
    <div className='m-auto flex max-w-200 flex-col items-center gap-[5px]'>
      <div className='flex max-w-175 flex-col gap-[30px] text-center'>
        <h1 className='text-[38px] font-medium text-[#3f4149]'>Подключиться к игре</h1>
        <p className='text-[18px] font-normal text-[#3f4149]'>
          Проверьте камеру и звук перед началом. Убедитесь, что вас хорошо видно и слышно.
        </p>
      </div>
      <div className='mt-[27px] flex w-full gap-5 pt-[10px]'>
        <CameraPreview />
        <ChangeNickname />
      </div>
      <div className='h-[43px] w-full'>
        <DeviceStatusChecker />
      </div>
      <GameButton className='mt-10 h-8 w-75' roomId={roomId} gameType={gameType} />
    </div>
  );
};
