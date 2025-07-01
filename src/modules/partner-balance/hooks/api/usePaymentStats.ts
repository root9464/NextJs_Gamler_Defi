import { PaymentOrderSchema } from '@/modules/table-statistics/hooks/api/usePaymentOrders';
import { proxy } from '@/shared/lib/proxy';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod/v4';

const useDebt = (authorId: number) =>
  useQuery({
    queryKey: ['debt', authorId],
    queryFn: async () => {
      const paymentOrders = await proxy.get(`/api/web3/referral/${authorId}/payment-orders`, {
        schema: z.array(PaymentOrderSchema),
      });
      const debt = paymentOrders.reduce((acc, order) => acc + Number(order.total_amount), 0);
      return debt;
    },
    enabled: !!authorId && authorId !== 0,
  });

const EarningsSchema = z.object({
  balance: z.number(),
});

const useEarnings = (authorId: number) =>
  useQuery({
    queryKey: ['earnings', authorId],
    queryFn: async () => {
      const earnings = await proxy.get(`/api/web2/referral/user/${authorId}/balance`, {
        schema: EarningsSchema,
      });
      return earnings;
    },
    enabled: !!authorId && authorId !== 0,
  });

export { useDebt, useEarnings };
