import { CurashFlow } from '@/modules/games/curash/interfaces/flows/curash-flow';
import type { ReactNode } from 'react';

type GameType = 'sales_courage' | 'acceptence';

const gameFlows: Record<GameType, ReactNode> = {
  sales_courage: <CurashFlow />,
  acceptence: <></>,
};

export const getUserGameFlow = (type: GameType) => gameFlows[type] ?? null;
