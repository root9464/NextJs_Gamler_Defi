'use client';
import { buttonStyles } from '@/components/ui/button';
import { cn } from '@/shared/utils/tw.utils';
import Link from 'next/link';
import type { FC } from 'react';

type GameButtonProps = {
  className?: string;
  gameType: string;
  roomId: string;
};

export const GameButton: FC<GameButtonProps> = ({ className, gameType, roomId }) => {
  const linkTo = `/game/scene/${gameType}/${roomId}`;
  return (
    <Link className={cn(buttonStyles({ intent: 'outline', size: 'sm' }), className)} href={linkTo}>
      Продолжить
    </Link>
  );
};
