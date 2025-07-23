import { atom } from 'jotai';

type SwapState = {
  send: string;
  receive: string;
  amount: number;
};

const swapStateAtom = atom<SwapState>({
  send: 'native',
  receive: '',
  amount: 0,
});

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
