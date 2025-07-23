import { proxy } from '@/shared/lib/proxy';
import { useQuery } from '@tanstack/react-query';

type WalletAddress = {
  address: string;
  is_scam: boolean;
  is_wallet: boolean;
};

type Jetton = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  image: string;
  verification: 'whitelist' | 'none';
};

type Balance = {
  balance: string;
  wallet_address: WalletAddress;
  jetton: Jetton;
};

type Jettons = {
  id: number;
  blockchain_id: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  price_usd: number;
  price_change_24h: number;
  tvl: number;
  holders_count: number;
  image: string;
  external_id: string;
  trust_score: number;
  last_updated_at: string;
  stacking_pool_id: number | null;
  stacking_pool: unknown | null;
  labels: string[];
};

const useTonPrice = () =>
  useQuery({
    queryKey: ['ton'],
    queryFn: async () => {
      const response = await proxy.get<Jettons>('/api/coffee_client/tokens/address/UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ');
      return response;
    },

    refetchInterval: false,
    staleTime: 1000 * 60 * 2,
  });

type AddressInfo = {
  address: string;
  balance: number;
  last_activity: number;
  status: string;
  interfaces: string[];
  get_methods: string[];
  is_wallet: boolean;
};

const useTon = (address: string) =>
  useQuery({
    queryKey: ['ton_price', address],
    queryFn: async () => {
      const response = await proxy.get<AddressInfo>(`/api/ton/accounts/${address}`);
      return response;
    },
    enabled: !!address,
    refetchInterval: false,
    staleTime: 1000 * 60 * 2,
  });

export { useTon, useTonPrice };
export type { Balance, Jetton, Jettons, WalletAddress };
