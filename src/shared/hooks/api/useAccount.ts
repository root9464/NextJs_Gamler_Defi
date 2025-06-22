import { AdditionalInformation, AdditionalInformationSchema } from '@shared/types/orders';
import { fetchData } from '@shared/utils/zod.utils';
import { useQuery } from '@tanstack/react-query';

const useAccount = (address: string) =>
  useQuery({
    queryKey: ['account', address],
    queryFn: async () => {
      const user = await fetchData<AdditionalInformation>({
        method: 'GET',
        url: `/api/web2/referral/referrer/${address}`,
        schema: AdditionalInformationSchema,
      });

      return user;
    },
    enabled: !!address,
  });

export { useAccount };
