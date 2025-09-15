'use client';
import { useAtomValue } from 'jotai';
import type { FC } from 'react';
import { UserCameraFrame } from '../slices/user-camera-frame';
import type { Player } from '../store/players';
import { currentUserIdAtom, playersAtom } from '../store/players';
import { remoteStreamsAtom } from '../store/video';

type Props = {
  cardHolder: FC<{ userId: string }>;
};

export const RemoteUsersCamera: FC<Props> = ({ cardHolder }) => {
  const remoteStreams = useAtomValue(remoteStreamsAtom);
  const players = useAtomValue(playersAtom) ?? [];
  const currentUserId = useAtomValue(currentUserIdAtom);

  return (
    <div className='max-desktop-xs:hidden flex max-h-[1587px] w-full flex-wrap content-start gap-6 overflow-y-auto'>
      {players.map((player) => {
        const isCurrent = player.id === currentUserId;
        const stream = player.streamId ? remoteStreams.find((s) => s.id === player.streamId) : undefined;

        return (
          <div className='flex h-[294px] w-[332px] flex-col gap-[25px]' key={player.id}>
            {isCurrent ? (
              <LocalUserBanner player={player} cardHolder={cardHolder} />
            ) : stream ? (
              <UserCameraFrame player={player} stream={stream} cardHolder={cardHolder} />
            ) : (
              <PlaceholderFrame player={player} cardHolder={cardHolder} />
            )}
          </div>
        );
      })}
    </div>
  );
};

type PlaceholderFrameProps = {
  player: Player;
  cardHolder: FC<{ userId: string }>;
};

const PlaceholderFrame: FC<PlaceholderFrameProps> = ({ player, cardHolder: CardHolder }) => {
  console.log('Rendering placeholder for player', player.id);
  const initials = (player.name || player.id)
    .split(' ')
    .map((s) => s[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className='flex flex-col gap-2.5'>
      <div className='relative flex h-50 w-[332px] shrink-0 flex-col items-center justify-center rounded-[11px] bg-neutral-800 px-[15px] py-[18px]'>
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-neutral-700 text-xl font-bold text-gray-300'>
          {initials || '?'}
        </div>
        <div className='mt-2 text-sm text-gray-400'>{player.name || player.id}</div>
      </div>
      <CardHolder userId={player.id} />
    </div>
  );
};

type LocalUserBannerProps = {
  player: Player;
  cardHolder: FC<{ userId: string }>;
};

const LocalUserBanner: FC<LocalUserBannerProps> = ({ cardHolder: CardHolder, player }) => {
  return (
    <div className='flex flex-col gap-2.5'>
      <div
        className='relative flex h-[200px] w-full shrink-0 items-center justify-center rounded-[11px] bg-red-600 px-[15px] py-[18px]'
        role='status'
        aria-label='local-user-banner'
      />
      <CardHolder userId={player.id} />
    </div>
  );
};
