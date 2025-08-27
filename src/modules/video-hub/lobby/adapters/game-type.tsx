import { CurashFlow } from '@/modules/games/curash/interfaces/flows/curash-flow';
import type { ReactNode } from 'react';

type GameType = 'curash' | 'acceptence';

const gameFlows: Record<GameType, ReactNode> = {
  curash: <CurashFlow />,
  acceptence: <></>,
};

export const getUserGameFlow = (type: GameType) => gameFlows[type] ?? null;
