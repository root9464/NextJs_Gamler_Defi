'use client';
import { useAtomValue } from 'jotai';
import { UserCameraFrame } from '../slices/user-camera-frame';
import type { Player } from '../store/players';
import { currentUserIdAtom, playersAtom } from '../store/players';
import { remoteStreamsAtom } from '../store/video';

export const RemoteUsersCamera = () => {
  const remoteStreams = useAtomValue(remoteStreamsAtom);
  const players = useAtomValue(playersAtom);
  const currentUserId = useAtomValue(currentUserIdAtom);

  console.log(
    'Remote streams:',
    remoteStreams.map((s) => s.id),
  );
  console.log('Players:', players);
  console.log('Current user ID:', currentUserId);

  return (
    <div className='max-desktop-xs:hidden flex max-h-[1587px] w-full flex-wrap content-start gap-6 overflow-y-auto'>
      {players
        .filter((player) => player.id !== currentUserId)
        .map((player) => {
          const stream = player.streamId ? remoteStreams.find((s) => s.id === player.streamId) : undefined;
          console.log(`Rendering player ${player.id}: streamId=${player.streamId}, streamExists=${!!stream}`);
          return (
            <div className='flex h-[294px] w-[332px] flex-col gap-[25px]' key={player.id}>
              {stream ? <UserCameraFrame stream={stream} /> : <PlaceholderFrame player={player} />}
            </div>
          );
        })}
    </div>
  );
};

const PlaceholderFrame = ({ player }: { player: Player }) => {
  const initials = (player.name || player.id)
    .split(' ')
    .map((s) => s[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className='relative flex h-50 w-[332px] shrink-0 flex-col items-center justify-center rounded-[11px] bg-neutral-800 px-[15px] py-[18px]'>
      <div className='flex h-16 w-16 items-center justify-center rounded-full bg-neutral-700 text-xl font-bold text-gray-300'>
        {initials || '?'}
      </div>
      <div className='mt-2 text-sm text-gray-400'>{player.name || player.id}</div>
    </div>
  );
};
