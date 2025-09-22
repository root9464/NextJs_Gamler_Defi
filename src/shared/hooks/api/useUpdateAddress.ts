import { proxy } from '@/shared/lib/proxy';
import { useQuery } from '@tanstack/react-query';

export const useUpdateAddress = (address: string, userID: number) =>
  useQuery({
    queryKey: ['new-address', address, userID],
    queryFn: async () =>
      await proxy.patch(`/api/web2/referral/user/${userID}/wallet-address`, {
        wallet_address: address,
      }),
    enabled: !!address && !!userID,
  });
