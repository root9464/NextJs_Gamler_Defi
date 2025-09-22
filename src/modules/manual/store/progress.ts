import { atom } from 'jotai';

type ProgressState = {
  step: number;
  total: number;
};

const progressAtom = atom<ProgressState>({
  step: 0,
  total: 11,
});

export { progressAtom };
export type { ProgressState };
