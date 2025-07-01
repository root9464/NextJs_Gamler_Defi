import { fetchData } from '@/shared/utils/zod.utils';
import { BaseUserSchema, ReferralProgramChoiceSchema } from '@shared/types/orders';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod/v4';

const ReferralsSchema = BaseUserSchema.extend({
  createdAt: z.string().nullable().optional(),
  referred_users: z.array(ReferralProgramChoiceSchema).optional(),
});

type Referrals = z.infer<typeof ReferralsSchema>;

const useRefferals = (wallet_address: string) =>
  useQuery({
    queryKey: ['referrals-users', wallet_address],
    queryFn: async () => {
      const refferals = await fetchData<Referrals>({
        method: 'GET',
        url: `/referral/referrer/levels2/${wallet_address}`,
        schema: ReferralsSchema,
      });
      return refferals;
    },
    enabled: !!wallet_address,
    refetchInterval: 10000,
  });

export { useRefferals };

export type { Referrals };
