import { atom } from 'jotai';

type Trick = { ico: number };

export const trickAtom = atom<Trick>({
  ico: 4,
});
