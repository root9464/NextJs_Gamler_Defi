import { proxy } from '@/shared/lib/proxy';
import { useQuery } from '@tanstack/react-query';

type TokenMetadata = {
  name: string;
  symbol: string;
  decimals: number;
  listed: boolean;
  image_url: string;
};

type TokenAddress = {
  blockchain: string;
  address: string;
};

type Token = {
  address: TokenAddress;
  metadata: TokenMetadata;
};

type SwapDetails = {
  result: string;
  input_amount: number;
  output_amount: number;
  before_reserves: number[];
  after_reserves: number[];
};

type Path = {
  blockchain: string;
  dex: string;
  pool_address: string;
  input_token: Token;
  output_token: Token;
  swap: SwapDetails;
  recommended_gas: number;
  average_gas: number;
  next?: Path[];
};

type SwapResponse = {
  input_token: Token;
  output_token: Token;
  input_amount: number;
  output_amount: number;
  input_usd: number;
  output_usd: number;
  recommended_gas: number;
  price_impact: number;
  paths: Path[];
  savings: number;
  estimated_cashback_usd: number;
};

const usePavingRoute = (sendToken: string, receiveToken: string, amount: number) =>
  useQuery({
    queryKey: ['paving-route', sendToken, receiveToken, amount],
    queryFn: async () => {
      const response = await proxy.post<SwapResponse>('/api/coffee_server/route', {
        input_token: {
          blockchain: 'ton',
          address: sendToken,
        },
        output_token: {
          blockchain: 'ton',
          address: receiveToken,
        },
        input_amount: amount,
      });

      return response;
    },

    enabled: !!sendToken && !!receiveToken && amount > 0 && !!amount,
    refetchInterval: false,
    staleTime: 1000 * 60,
  });

export { usePavingRoute };
export type { Path, SwapResponse };
