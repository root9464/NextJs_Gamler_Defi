/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { atom } from 'jotai';

export type Player = {
  id: string;
  name: string;
  isHost: boolean;
  position: { x: number; y: number };
  hand: any[];
  metadata: any;
};

export const playersAtom = atom<Player[]>([]);

export const currentUserIdAtom = atom<string | null>(null);
