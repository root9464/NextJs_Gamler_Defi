import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Path } from './usePavingRoute';

type BodyTransation = {
  address: string;
  value: string;
  cell: string;
  send_mode: number;
  query_id: number;
};

type SwapBodyTransaction = {
  route_id: number;
  transactions: BodyTransation[];
};

const useSwap = (paths: Path[], slippage: number, address: string) =>
  useQuery({
    queryKey: ['swap', paths, slippage, address],
    queryFn: async () => {
      const { data, status, statusText } = await axios.post<SwapBodyTransaction>('https://backend.swap.coffee/v2/route/transactions', {
        sender_address: address,
        slippage: slippage,
        referral_name: 'tonkeeper',
        paths: paths,
      });

      if (status !== 200) {
        throw new Error(statusText);
      }

      return data;
    },
    enabled: !!paths.length && paths.length > 0 && !!address,
    refetchInterval: false,
    staleTime: 1000 * 60,
  });

export { useSwap };
export type { BodyTransation, SwapBodyTransaction };
