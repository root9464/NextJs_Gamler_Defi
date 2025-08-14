'use client';
import { Change } from '@/assets/svg/change';
import { idRoom } from '@/modules/video-hub/store/hub-id';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

type LobbyCameraProps = {
  stream: MediaStream | null;
};

type DeviceStatus = {
  available: boolean;
  name: string;
};

type DevicesState = {
  audioOutput: DeviceStatus;
  audioInput: DeviceStatus;
  videoInput: DeviceStatus;
};

export const useUserMedia = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startStream = useCallback(async () => {
    if (streamRef.current) return;

    try {
      console.log('[useUserMedia] Запрашиваю доступ к медиа...');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      console.log('[useUserMedia] Доступ получен.');
      streamRef.current = stream;
      setMediaStream(stream);
    } catch {
      console.error();
    }
  }, []);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      console.log('[useUserMedia] Останавливаю поток.');
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setMediaStream(null);
    }
  }, []);

  return { mediaStream, startStream, stopStream };
};

export default function Lobby() {
  const { mediaStream, startStream, stopStream } = useUserMedia();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const roomId = useAtomValue(idRoom);
  const linkTo = `/video/hub/curash/${roomId}`;

  useEffect(() => {
    startStream();
    return () => {
      stopStream();
    };
  }, [startStream, stopStream]);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className='m-auto flex max-w-[800px] flex-col items-center gap-[20px]'>
      <div className='flex max-w-[700px] flex-col gap-[30px] text-center'>
        <h1 className='text-[38px] font-medium text-[#3f4149]'>Подключиться к игре</h1>
        <p className='text-[18px] font-normal text-[#3f4149]'>
          Проверьте камеру и звук перед началом. Убедитесь, что вас хорошо видно и слышно.
        </p>
      </div>
      <div className='mt-[27px] flex w-full gap-[20px]'>
        <LobbyCamera stream={mediaStream} />
        <div className='flex w-[270px] flex-col gap-[40px] pt-[40px]'>
          <div className='flex flex-col'>
            <h1 className='text-[18px] font-medium text-[#3f4149]'>Ваше имя в игре:</h1>
            <div className='flex items-center gap-[10px] pt-[20px]'>
              {open ? (
                <div className='flex gap-[5px]'>
                  <input
                    type='text'
                    placeholder='введите новое имя'
                    className='h-[24px] rounded-[3px] border-1 border-black pl-[5px] text-[14px] outline-0'
                  />
                  <button className='h-[24px] cursor-pointer rounded-[3px] bg-[#1677ff] px-[7px] text-[14px] text-white hover:bg-[#4096ff]'>
                    сохранить
                  </button>
                  <button
                    onClick={handleOpen}
                    className='h-[24px] cursor-pointer rounded-[3px] border-1 border-black bg-white px-[7px] text-[14px] text-black hover:border-[#1677ff] hover:text-[#1677ff]'>
                    отмена
                  </button>
                </div>
              ) : (
                <div className='flex items-center gap-[5px]'>
                  <p className='text-[18px]'>morteit</p>
                  <div
                    onClick={handleOpen}
                    className='text-[] flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full border-[1px] border-[#D9D9D9] text-blue-400 hover:text-black'>
                    <Change />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <h2 className='text-[18px] font-medium text-[#3f4149]'>Ваша фишка в игре:</h2>
            <div className='flex items-center gap-[10px] pt-[20px]'>
              <div className='h-[32px] w-[32px] rounded-full bg-black' />
              <div className='flex cursor-pointer items-center justify-center text-blue-400 hover:text-black'>
                {/* <img src='' alt='' /> */}
                <p>Сменить фишку</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='h-[43px] w-full'>
        <DeviceStatusChecker />
      </div>
      <button
        onClick={() => router.push(linkTo)}
        className='mt-[40px] h-[36px] w-[300px] cursor-pointer rounded-[6px] border-0 bg-[#1677ff] text-[16px] text-white outline-0 hover:bg-[#4096ff]'>
        Продолжить
      </button>
    </div>
  );
}

const LobbyCamera: FC<LobbyCameraProps> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const showVideo = stream;

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement && stream) {
      videoElement.srcObject = stream;
      const playPromise = videoElement.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error('Ошибка автовоспроизведения видео:', error);
        });
      }
    }
  }, [stream]);

  return (
    <div className='relative flex h-[317px] w-full max-w-[510px] min-w-[200px] items-center justify-center'>
      {showVideo ? (
        <video ref={videoRef} autoPlay playsInline muted className='h-[317px] w-[510px]' />
      ) : (
        <div className='flex h-[317px] w-full max-w-[510px] min-w-[200px] items-center justify-center rounded-[22px] bg-[#1C1E20]'>
          <div className='flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white'>
            <p className='text-[32px] font-medium text-black'>?</p>
          </div>
        </div>
      )}
      <div className='absolute bottom-[30px] flex h-[38px] w-[94px] items-center justify-between'>
        <button className='h-[38px] w-[38px] cursor-pointer rounded-full bg-[#292b2c] text-white hover:bg-[white] hover:text-blue-400'>m</button>
        <button className='h-[38px] w-[38px] cursor-pointer rounded-full bg-[#292b2c] text-white hover:bg-[white] hover:text-blue-400'>v</button>
      </div>
    </div>
  );
};

const DeviceStatusChecker: FC = () => {
  const [devices, setDevices] = useState<DevicesState>({
    audioOutput: { available: false, name: 'Не определено' },
    audioInput: { available: false, name: 'Не определено' },
    videoInput: { available: false, name: 'Не определено' },
  });

  const updateDeviceStates = (deviceList: MediaDeviceInfo[]) => {
    const audioOutput = deviceList.find((device) => device.kind === 'audiooutput');
    const audioInput = deviceList.find((device) => device.kind === 'audioinput');
    const videoInput = deviceList.find((device) => device.kind === 'videoinput');

    setDevices({
      audioOutput: {
        available: !!audioOutput,
        name: audioOutput?.label || 'Системные динамики',
      },
      audioInput: {
        available: !!audioInput,
        name: audioInput?.label || 'Микрофон не найден',
      },
      videoInput: {
        available: !!videoInput,
        name: videoInput?.label || 'Камера не найдена',
      },
    });
  };

  useEffect(() => {
    const checkDevices = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });

        const deviceList = await navigator.mediaDevices.enumerateDevices();
        updateDeviceStates(deviceList);
        stream.getTracks().forEach((track) => track.stop());
      } catch (error) {
        console.error('Error accessing media devices:', error);
        const deviceList = await navigator.mediaDevices.enumerateDevices();
        updateDeviceStates(deviceList);
      }
    };

    checkDevices();
  }, []);

  return (
    <div className='flex justify-between'>
      <div className='flex flex-col'>
        <span className='font-medium'>Динамики:</span>
        <p>{devices.audioOutput.name}</p>
      </div>
      <div className='flex flex-col'>
        <span className='font-medium'>Микрофон:</span>
        <p>{devices.audioInput.name}</p>
      </div>
      <div className='flex flex-col'>
        <span className='font-medium'>Камера:</span>
        <p>{devices.videoInput.name}</p>
      </div>
    </div>
  );
};
