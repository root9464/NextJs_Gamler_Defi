import { proxy } from '@/shared/lib/proxy';
import { useQuery } from '@tanstack/react-query';

type Address = {
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
  verification: string;
  score: number;
};

type TokenBalance = {
  balance: string;
  wallet_address: Address;
  jetton: Jetton;
};

const useJettonWallet = ({ address }: { address: string }) =>
  useQuery({
    queryKey: ['jetton-wallet', address],
    queryFn: async () => {
      const jettons = await proxy.get<{ balances: TokenBalance[] }>(`/api/ton/accounts/${address}/jettons`);
      return jettons;
    },
    enabled: !!address,
  });

export { useJettonWallet };
export type { TokenBalance };
