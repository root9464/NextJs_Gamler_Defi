import { ChangeNick } from '@/modules/video-hub/lobby/features/change-nick';
import { DeviceStatusChecker } from '@/modules/video-hub/lobby/features/device-status-checker';
import { LobbyCamera } from '@/modules/video-hub/lobby/features/lobby-camera';
import { LobbyButton } from './features/lobby-button';

export const LobbyModule = () => {
  return (
    <div className='m-auto flex max-w-[800px] flex-col items-center gap-[5px]'>
      <div className='flex max-w-[700px] flex-col gap-[30px] text-center'>
        <h1 className='text-[38px] font-medium text-[#3f4149]'>Подключиться к игре</h1>
        <p className='text-[18px] font-normal text-[#3f4149]'>
          Проверьте камеру и звук перед началом. Убедитесь, что вас хорошо видно и слышно.
        </p>
      </div>
      <div className='mt-[27px] flex w-full gap-[20px] pt-[10px]'>
        <LobbyCamera />
        <ChangeNick />
      </div>
      <div className='h-[43px] w-full'>
        <DeviceStatusChecker />
      </div>
      <LobbyButton className='mt-[40px] h-[32px] w-[300px] bg-[#1677ff] text-white hover:bg-[#4096ff] hover:text-[white]' />
    </div>
  );
};
