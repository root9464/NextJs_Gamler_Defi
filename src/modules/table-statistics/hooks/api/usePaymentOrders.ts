import { Web2ApiInstance } from '@/shared/lib/axios';
import type { AdditionalInformation, BaseUser } from '@shared/types/orders';
import { AdditionalInformationSchema } from '@shared/types/orders';
import type { Extend } from '@shared/types/utils';
import { fetchData } from '@shared/utils/zod.utils';

import { useQuery } from '@tanstack/react-query';
import { z } from 'zod/v4';

const LevelSchema = z.object({
  level_number: z.number(),
  rate: z.string(),
  amount: z.string(),
  address: z.string(),
});

const PaymentOrderSchema = z.object({
  id: z.string(),
  leader_id: z.number(),
  referrer_id: z.number(),
  referral_id: z.number(),
  total_amount: z.string(),
  ticket_count: z.number(),
  levels: z.array(LevelSchema),
  created_at: z.number(),
});

type Level = z.infer<typeof LevelSchema>;
type PaymentOrder = z.infer<typeof PaymentOrderSchema>;
type AdditionalProperties = Pick<BaseUser, 'telegram'>;
type PaymentOrdersResponse = Extend<PaymentOrder, AdditionalProperties>;

const usePaymentOrder = (authorId: number) =>
  useQuery({
    queryKey: ['payment-orders', authorId],
    queryFn: async () => {
      const paymentOrders = await fetchData<PaymentOrder[]>({
        method: 'GET',
        url: `/api/web3/referral/${authorId}/payment-orders`,
        schema: z.array(PaymentOrderSchema),
      });

      const additionalInfoPromises = paymentOrders.map((order) =>
        fetchData<AdditionalInformation>({
          method: 'GET',
          url: `/referral/referrer/${order.referral_id}`,
          schema: AdditionalInformationSchema,
          instance: Web2ApiInstance,
        }),
      );

      const additionalInfos = await Promise.all(additionalInfoPromises);

      return paymentOrders.map<PaymentOrdersResponse>((order, index) => ({
        ...order,
        telegram: additionalInfos[index].telegram,
      }));
    },
    enabled: !!authorId,
  });

export { AdditionalInformationSchema, PaymentOrderSchema, usePaymentOrder };
export type { AdditionalInformation, Level, PaymentOrder };
