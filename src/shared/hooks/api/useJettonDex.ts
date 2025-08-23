import { proxy } from '@/shared/lib/proxy';
import { useQuery } from '@tanstack/react-query';

type JettonDexResponse = {
  created_at: string;
  address: string;
  total_supply: string;
  decimals: number;
  mintable: boolean;
  verification: string;
  name: string;
  symbol: string;
  contract_interface: string;
  image_url: string;
  market_stats: JettonStats;
  labels: string[];
};

type JettonStats = {
  holders_count: number;
  price_usd: number;
  price_change_5m: number;
  price_change_1h: number;
  price_change_6h: number;
  price_change_24h: number;
  volume_usd_24h: number;
  tvl_usd: number;
  fdmc: number;
};

const useJettonDex = (address: string) =>
  useQuery({
    queryKey: ['jetton-dex', address],
    queryFn: async () => await proxy.get<JettonDexResponse>(`/api/coffee_client/v3/jettons/${address}`),
  });

export { useJettonDex };
export type { JettonDexResponse };
