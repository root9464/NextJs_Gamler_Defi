'use client';
import { useMockPlayers } from '@/shared/mocks/users';
import { cn } from '@/shared/utils/tw.utils';
import { useAtomValue } from 'jotai';
import { motion } from 'motion/react';
import { useEffect, type FC } from 'react';
import { CameraPlaceholder } from '../slices/camera-placeholder';
import { LocalUserPlaceholder } from '../slices/local-user-camera';
import { UserCameraFrame } from '../slices/user-camera-frame';
import type { Player } from '../store/players';
import { currentUserIdAtom, playersAtom } from '../store/players';
import { remoteStreamsAtom } from '../store/video';

type RemoteUsersCameraProps = {
  cardHolder: FC<{ userId: string }>;
  classNames?: {
    container?: string;
    item?: string;
  };
};

const getPlayerStream = (player: Player, streams: MediaStream[]) => {
  return player.streamId ? streams.find((s) => s.id === player.streamId) : undefined;
};

type RemotePlayerCardProps = {
  player: Player;
  cardHolder: FC<{ userId: string }>;
  stream?: any;
  className?: string;
};

const RemotePlayerCard: FC<RemotePlayerCardProps> = ({ player, cardHolder, stream, className }) => (
  <motion.div className={cn('flex flex-col gap-[25px]', 'max-desktop-xs:shrink-0', className)} layout>
    {stream ? (
      <UserCameraFrame player={player} stream={stream} cardHolder={cardHolder} />
    ) : (
      <CameraPlaceholder player={player} cardHolder={cardHolder} />
    )}
  </motion.div>
);

type LocalPlayerCardProps = {
  player: Player;
  cardHolder: FC<{ userId: string }>;
  className?: string;
};

const LocalPlayerCard: FC<LocalPlayerCardProps> = ({ player, cardHolder, className }) => (
  <motion.div className={cn('flex flex-col gap-[25px]', 'max-desktop-xs:shrink-0', className)} layout>
    <LocalUserPlaceholder player={player} cardHolder={cardHolder} />
  </motion.div>
);

export const RemoteUsersCamera: FC<RemoteUsersCameraProps> = ({ cardHolder, classNames }) => {
  const remoteStreams = useAtomValue(remoteStreamsAtom);
  const players = useAtomValue(playersAtom) ?? [];
  const currentUserId = useAtomValue(currentUserIdAtom);
  const { initializeMockPlayers } = useMockPlayers();

  useEffect(() => {
    initializeMockPlayers(5, true);
  }, []);

  const localPlayer = players.find((player) => player.id === currentUserId);
  const remotePlayers = players.filter((player) => player.id !== currentUserId);

  return (
    <motion.div
      className={cn(
        'scrollbar-hide flex max-h-[1587px] w-full flex-wrap content-start gap-6 overflow-y-auto',
        'max-desktop-xs:h-fit max-desktop-xs:max-h-min max-desktop-xs:flex-row max-desktop-xs:gap-3 max-desktop-xs:flex-nowrap',
        classNames?.container,
      )}
      layout>
      {localPlayer && <LocalPlayerCard player={localPlayer} cardHolder={cardHolder} className={classNames?.item} />}

      {remotePlayers.map((player) => {
        const stream = getPlayerStream(player, remoteStreams);
        return <RemotePlayerCard key={player.id} player={player} cardHolder={cardHolder} stream={stream} className={classNames?.item} />;
      })}
    </motion.div>
  );
};
