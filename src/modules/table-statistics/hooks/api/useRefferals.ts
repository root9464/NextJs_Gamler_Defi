import { proxy } from '@/shared/lib/proxy';
import { BaseUserSchema, ReferralProgramChoiceSchema } from '@shared/types/orders';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod/v4';

const ReferralsSchema = BaseUserSchema.extend({
  createdAt: z.string().nullable().optional(),
  referred_users: z.array(ReferralProgramChoiceSchema).optional(),
});

type Referrals = z.infer<typeof ReferralsSchema>;

const useRefferals = (authorId: number) =>
  useQuery({
    queryKey: ['referrals-users', authorId],
    queryFn: async () => {
      const refferals = await proxy.get(`/api/web2/referral/referrer/levels2/${authorId}`, {
        schema: ReferralsSchema,
      });
      return refferals;
    },
    enabled: !!authorId,
    refetchInterval: 10000,
  });

export { useRefferals };

export type { Referrals };
