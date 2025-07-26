import { atom } from 'jotai';

type SwapState = {
  send: string;
  receive: string;
  amount: number;
};

const INITIAL_STATE = {
  send: '',
  receive: '',
  amount: 0,
};

const swapStateAtom = atom<SwapState>(INITIAL_STATE);

const setSwapStateAtom = atom(null, (_, set, state: SwapState) => {
  set(swapStateAtom, state);
});

const drivenSwapStateAtom = atom(null, (get, set, partialState: Partial<SwapState>) => {
  set(swapStateAtom, { ...get(swapStateAtom), ...partialState });
});

const updateSwapStateAtom = atom(null, (get, set, updateFn: (prevState: SwapState) => Partial<SwapState>) => {
  set(swapStateAtom, { ...get(swapStateAtom), ...updateFn(get(swapStateAtom)) });
});

export { drivenSwapStateAtom, setSwapStateAtom, swapStateAtom, updateSwapStateAtom };
export type { SwapState };
