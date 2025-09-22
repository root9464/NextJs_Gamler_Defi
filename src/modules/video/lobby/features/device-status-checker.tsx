'use client';
import { cn } from '@/shared/utils/tw.utils';
import { useEffect, useState } from 'react';

type DeviceKind = 'audiooutput' | 'audioinput' | 'videoinput';

type DeviceState = {
  kind: DeviceKind;
  label: string;
  available: boolean;
};

type DevicesState = Record<DeviceKind, DeviceState>;

const DEFAULT_STATE: DevicesState = {
  audiooutput: { kind: 'audiooutput', label: 'Системные динамики', available: false },
  audioinput: { kind: 'audioinput', label: 'Микрофон не найден', available: false },
  videoinput: { kind: 'videoinput', label: 'Камера не найдена', available: false },
};

export const DeviceStatusChecker = () => {
  const [devices, setDevices] = useState<DevicesState>(DEFAULT_STATE);

  useEffect(() => {
    const update = async () => {
      if (!navigator.mediaDevices?.enumerateDevices) return;
      let stream: MediaStream | null = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        const ids = stream
          .getTracks()
          .map((t) => t.getSettings().deviceId)
          .filter(Boolean);
        const list = await navigator.mediaDevices.enumerateDevices();
        const next = { ...DEFAULT_STATE };
        list.forEach((d) => {
          if (d.kind in next && ids.includes(d.deviceId)) {
            next[d.kind as DeviceKind] = {
              kind: d.kind as DeviceKind,
              label: d.label || DEFAULT_STATE[d.kind as DeviceKind].label,
              available: true,
            };
          }
        });
        setDevices(next);
      } finally {
        stream?.getTracks().forEach((t) => t.stop());
      }
    };
    update();
    navigator.mediaDevices.addEventListener('devicechange', update);
    return () => navigator.mediaDevices.removeEventListener('devicechange', update);
  }, []);

  return (
    <div className={cn('flex h-max w-full flex-row justify-center gap-14', 'max-desktop-xs:grid')}>
      {(['audiooutput', 'audioinput', 'videoinput'] as const).map((type) => (
        <div key={type} className='max-desktop-xs:items-center flex flex-col'>
          <span className='font-bold'>{type === 'audiooutput' ? 'Динамики' : type === 'audioinput' ? 'Микрофон' : 'Камера'}</span>
          <p>{devices[type].label}</p>
        </div>
      ))}
    </div>
  );
};
