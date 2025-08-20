'use client';
import { buttonStyles } from '@/components/ui/button';
import { cn } from '@/shared/utils/tw.utils';
import Link from 'next/link';
import type { FC } from 'react';

type LobbyButtonProps = {
  className?: string;
  gameType: string | undefined;
  roomId: string;
};

export const LobbyButton: FC<LobbyButtonProps> = ({ className, gameType, roomId }) => {
  const linkTo = `/video/hub/${gameType}/${roomId}`;

  return (
    <Link className={cn(buttonStyles({ intent: 'outline', size: 'sm' }), className)} href={linkTo}>
      Продолжить
    </Link>
  );
};
