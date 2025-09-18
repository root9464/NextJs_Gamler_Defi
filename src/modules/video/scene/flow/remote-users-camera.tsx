'use client';
import { useMockPlayers } from '@/shared/mocks/users';
import { cn } from '@/shared/utils/tw.utils';
import { useAtomValue } from 'jotai';
import { useEffect, type FC } from 'react';
import { UserCameraFrame } from '../slices/user-camera-frame';
import type { Player } from '../store/players';
import { currentUserIdAtom, playersAtom } from '../store/players';
import { remoteStreamsAtom } from '../store/video';

type RemoteUsersCameraProps = {
  cardHolder: FC<{ userId: string }>;
};

export const RemoteUsersCamera: FC<RemoteUsersCameraProps> = ({ cardHolder }) => {
  const remoteStreams = useAtomValue(remoteStreamsAtom);
  const players = useAtomValue(playersAtom) ?? [];
  const currentUserId = useAtomValue(currentUserIdAtom);
  const { initializeMockPlayers } = useMockPlayers();

  useEffect(() => {
    initializeMockPlayers(5, true);
  }, []);

  return (
    <div
      className={cn(
        'scrollbar-hide flex max-h-[1587px] w-full flex-wrap content-start gap-6 overflow-y-auto',
        'max-desktop-xs:h-fit max-desktop-xs:max-h-min max-desktop-xs:flex-row max-desktop-xs:gap-3 max-desktop-xs:flex-nowrap',
      )}>
      {players.map((player) => {
        const isCurrent = player.id === currentUserId;
        const stream = player.streamId ? remoteStreams.find((s) => s.id === player.streamId) : undefined;

        return (
          <div
            className={cn(
              'flex h-[294px] w-[332px] flex-col gap-[25px]',
              'max-desktop-xs:h-min max-desktop-xs:w-[calc(50%-6px)] max-desktop-xs:shrink-0',
            )}
            key={player.id}>
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
  const initials = (player.name || player.id)
    .split(' ')
    .map((s) => s[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className='max-desktop-xs:w-full flex flex-col gap-2.5'>
      <div
        className={cn(
          'relative flex h-50 w-[332px] shrink-0 flex-col justify-between overflow-hidden rounded-[11px] bg-red-300 px-[15px] py-[18px]',
          'max-desktop-xs:w-full max-desktop-xs:px-2.5 max-desktop-xs:h-[77px] max-desktop-xs:py-1',
        )}>
        <div
          className={cn(
            'flex size-16 items-center justify-center rounded-full bg-neutral-700 text-xl font-bold text-gray-300',
            'max-desktop-xs:size-10 max-desktop-xs:self-center',
          )}>
          {initials || '?'}
        </div>
        <div className='max-desktop-xs:text-xs mt-2 text-sm text-gray-400'>{player.name || player.id}</div>
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
        className={cn(
          'relative flex h-50 w-[332px] shrink-0 flex-col justify-between overflow-hidden rounded-[11px] bg-red-300 px-[15px] py-[18px]',
          'max-desktop-xs:w-30 max-desktop-xs:px-2.5 max-desktop-xs:h-[77px] py-1',
        )}>
        <div className='relative z-10 flex w-full justify-between'>
          <div
            className={cn(
              'flex h-[22px] w-11 items-center justify-center rounded-[55px] bg-white text-xs text-black',
              'max-desktop-xs:text-[9px] max-desktop-xs:w-8 max-desktop-xs:h-5',
            )}>
            <p>Вы</p>
          </div>
        </div>
      </div>
      <CardHolder userId={player.id} />
    </div>
  );
};
