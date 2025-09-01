'use client'
import { useAtomValue } from 'jotai';
import { UserCameraFrame } from '../slices/user-camera-frame';
import { remoteStreamsAtom } from '../store/video';

export const RemoteUsersCamera = () => {
  const remoteStreams = useAtomValue(remoteStreamsAtom);
  return (
    <div className='max-desktop-xs:hidden flex max-h-[1587px] w-full flex-wrap content-start gap-6 overflow-y-auto'>
      {remoteStreams.map((stream, index) => (
        <div className='flex h-[294px] w-[332px] flex-col gap-[25px]' key={index}>
          <UserCameraFrame stream={stream} />
        </div>
      ))}
    </div>
  );
};
