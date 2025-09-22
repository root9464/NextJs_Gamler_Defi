import { proxy } from '@/shared/lib/proxy';
import { useQuery } from '@tanstack/react-query';

type JettonRateResponse = {
  address: string;
  usd_price: number;
};

const useJettonRate = (addresses: string[]) =>
  useQuery({
    queryKey: ['jetton-rate', addresses],
    queryFn: async () =>
      await proxy.post<JettonRateResponse>('/api/coffee_server/token/price', {
        blockchain: 'ton',
        addresses,
      }),

    enabled: !!addresses && addresses.length > 0 && addresses.every((address) => address.trim().length > 0),
  });

export { useJettonRate };
export type { JettonRateResponse };
