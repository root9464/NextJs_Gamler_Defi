import { atom } from 'jotai';

type SelectToken = {
  id: number;
  symbol: string;
  decimals: number;
  image: string;
  address: string;
};

type SelectedTokenState = {
  send: SelectToken | null;
  receive: SelectToken | null;
};

const selectedTokenAtom = atom<SelectedTokenState>({
  send: null,
  receive: null,
});

const setSelectTokenAtom = atom(null, (get, set, { type, token }: { type: 'send' | 'receive'; token: SelectToken }) => {
  set(selectedTokenAtom, { ...get(selectedTokenAtom), [type]: token });
});

const clearTokensAtom = atom(null, (_, set) => {
  set(selectedTokenAtom, { send: null, receive: null });
});

const getSelectedTokenAtom = atom((get) => (type: 'send' | 'receive') => get(selectedTokenAtom)[type]);

const updateSelectTokenAtom = atom(null, (get, set, updateFn: (prevState: SelectedTokenState) => Partial<SelectedTokenState>) => {
  set(selectedTokenAtom, { ...get(selectedTokenAtom), ...updateFn(get(selectedTokenAtom)) });
});

export { clearTokensAtom, getSelectedTokenAtom, selectedTokenAtom, setSelectTokenAtom, updateSelectTokenAtom };
export type { SelectedTokenState, SelectToken };
