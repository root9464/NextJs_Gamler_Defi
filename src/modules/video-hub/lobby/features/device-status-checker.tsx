'use client';
import { useCallback, useEffect, useState } from 'react';

const DEVICE_NAMES = {
  NOT_DETERMINED: 'Не определено',
  DEFAULT_AUDIO_OUTPUT: 'Системные динамики',
  NO_AUDIO_INPUT: 'Микрофон не найден',
  NO_VIDEO_INPUT: 'Камера не найдена',
  API_NOT_SUPPORTED: 'API не поддерживается',
};

const INITIAL_DEVICES_STATE = {
  audioOutput: { available: false, name: DEVICE_NAMES.NOT_DETERMINED },
  audioInput: { available: false, name: DEVICE_NAMES.NOT_DETERMINED },
  videoInput: { available: false, name: DEVICE_NAMES.NOT_DETERMINED },
};

export const DeviceStatusChecker = () => {
  const [devices, setDevices] = useState(INITIAL_DEVICES_STATE);

  const updateDeviceStates = useCallback((deviceList: MediaDeviceInfo[]) => {
    const audioOutput = deviceList.find((device) => device.kind === 'audiooutput');
    const audioInput = deviceList.find((device) => device.kind === 'audioinput');
    const videoInput = deviceList.find((device) => device.kind === 'videoinput');

    setDevices({
      audioOutput: {
        available: !!audioOutput,
        name: audioOutput?.label || DEVICE_NAMES.DEFAULT_AUDIO_OUTPUT,
      },
      audioInput: {
        available: !!audioInput,
        name: audioInput?.label || DEVICE_NAMES.NO_AUDIO_INPUT,
      },
      videoInput: {
        available: !!videoInput,
        name: videoInput?.label || DEVICE_NAMES.NO_VIDEO_INPUT,
      },
    });
  }, []);

  const checkDevices = useCallback(async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.error('MediaDevices API не поддерживается в этом браузере.');
      setDevices({
        audioOutput: { available: false, name: DEVICE_NAMES.API_NOT_SUPPORTED },
        audioInput: { available: false, name: DEVICE_NAMES.API_NOT_SUPPORTED },
        videoInput: { available: false, name: DEVICE_NAMES.API_NOT_SUPPORTED },
      });
      return;
    }

    let stream: MediaStream | undefined;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
    } catch (error) {
      console.log('[Warn] Ошибка доступа к медиа-устройствам (возможно, доступ запрещен):', error);
    } finally {
      const deviceList = await navigator.mediaDevices.enumerateDevices();
      updateDeviceStates(deviceList);

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    }
  }, [updateDeviceStates]);

  useEffect(() => {
    checkDevices();
    navigator.mediaDevices.addEventListener('devicechange', checkDevices);
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', checkDevices);
    };
  }, [checkDevices]);

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
