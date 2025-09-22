import { atom } from 'jotai';

export type Position = {
  x: number;
  y: number;
};

export type Player = {
  id: string;
  name: string;
  is_host: boolean;
  position: Position;
  hand: unknown[];
  metadata: Record<string, unknown>;
  streamId?: string;
  trackId?: string;
};

export const playersAtom = atom<Player[]>([]);

export const updatePlayerPositionAtom = atom(null, (get, set, { id, position }: { id: string; position: Position }) => {
  const players = get(playersAtom);
  const updated = players.map((p) => (p.id === id ? { ...p, position } : p));
  set(playersAtom, updated);
});

export const currentUserIdAtom = atom<string | null>(null);
