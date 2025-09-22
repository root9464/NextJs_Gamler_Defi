'use client';

import { UserGameSettings } from '@/modules/video/lobby/flow/user-game-settings';
import { cn } from '@/shared/utils/tw.utils';
import Link from 'next/link';
import type { FC } from 'react';
import { getUserGameFlow } from './adapters/game-type';
import { CameraPreview } from './features/camera-preview';
import { DeviceStatusChecker } from './features/device-status-checker';

type LobbyModuleProps = {
  roomId: string;
  gameType: 'sales_courage' | 'acceptence';
};

const Description = () => (
  <div className='flex max-w-175 flex-col gap-4 text-center'>
    <h1 className='text-4xl font-medium'>Подключиться к игре</h1>
    <p className='text-lg font-normal'>Проверьте камеру и звук перед началом. Убедитесь, что вас хорошо видно и слышно.</p>
  </div>
);

export const LobbyModule: FC<LobbyModuleProps> = ({ roomId, gameType }) => {
  const gameFlow = getUserGameFlow(gameType);

  const allowAudioAndNavigate = () => {
    document.querySelectorAll('video').forEach((v: HTMLVideoElement) => {
      v.muted = false;
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    });
  };

  return (
    <div className='m-auto flex w-full flex-col items-center justify-center gap-5'>
      <Description />
      <div className='max-desktop-xs:flex-col flex w-full flex-row justify-center gap-5 pt-2.5'>
        <CameraPreview />
        <UserGameSettings flows={gameFlow} />
      </div>
      <DeviceStatusChecker />

      <Link
        href={`/web3/game/scene/${gameType}/${roomId}`}
        className={cn('mt-10 flex h-8 w-75 items-center justify-center rounded bg-blue-600 text-white hover:bg-blue-500')}
        onClick={allowAudioAndNavigate}>
        Разрешить звук и перейти в комнату
      </Link>
    </div>
  );
};
