import { ChangeNick } from '@/modules/video-hub/lobby/features/change-nick';
import { DeviceStatusChecker } from '@/modules/video-hub/lobby/features/device-status-checker';
import { LobbyCamera } from '@/modules/video-hub/lobby/features/lobby-camera';
import type { FC } from 'react';
import { ChangeTrick } from './features/change-tick';
import { LobbyButton } from './features/lobby-button';

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
        <LobbyCamera />
        <div className='flex flex-col'>
          <ChangeNick />
          <ChangeTrick />
        </div>
      </div>
      <div className='h-[43px] w-full'>
        <DeviceStatusChecker />
      </div>
      <LobbyButton
        className='mt-10 h-8 w-75 bg-[#1677ff] text-white hover:bg-[#4096ff] hover:text-[white]'
        roomId={roomId}
        gameType={gameType}
      />
    </div>
  );
};
