import { atom } from 'jotai';
import type { SwapResponse } from '../hook/api/usePavingRoute';

type SwapResponseBasic = Omit<SwapResponse, 'recommended_gas' | 'price_impact' | 'savings' | 'estimated_cashback_usd'>;

const INITIAL_STATE: SwapResponseBasic = {
  input_token: {
    address: { blockchain: '', address: '' },
    metadata: { name: '', symbol: '', decimals: 0, listed: false, image_url: '' },
  },
  output_token: {
    address: { blockchain: '', address: '' },
    metadata: { name: '', symbol: '', decimals: 0, listed: false, image_url: '' },
  },
  input_amount: 0,
  output_amount: 0,
  input_usd: 0,
  output_usd: 0,
  paths: [],
};

const swapRouteAtom = atom<SwapResponseBasic>(INITIAL_STATE);

const resetSwapRouteAtom = atom(null, (_, set) => set(swapRouteAtom, INITIAL_STATE));

export { resetSwapRouteAtom, swapRouteAtom };
