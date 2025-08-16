'use client';
import { buttonStyles } from '@/components/ui/button';
import { idRoom } from '@/modules/video-hub/lobby/store/hub-id';
import { cn } from '@/shared/utils/tw.utils';
import { useAtomValue } from 'jotai';
import Link from 'next/link';
import type { FC } from 'react';

type LobbyButtonProps = {
  className?: string;
};

export const LobbyButton: FC<LobbyButtonProps> = ({ className }) => {
  const roomId = useAtomValue(idRoom);
  const linkTo = `/video/hub/curash/${roomId}`;

  return (
    <Link className={cn(buttonStyles({ intent: 'outline', size: 'sm' }), className)} href={linkTo}>
      Продолжить
    </Link>
  );
};
