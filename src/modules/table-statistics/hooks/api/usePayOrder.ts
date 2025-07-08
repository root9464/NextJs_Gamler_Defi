import { proxy } from '@/shared/lib/proxy';
import { useMutation } from '@tanstack/react-query';
import { useTonAddress } from '@tonconnect/ui-react';
import { z } from 'zod/v4';

const PaymentOrderSchema = z.object({
  cell: z.string(),
});

type PaymentOrder = z.infer<typeof PaymentOrderSchema>;

const usePayOrder = () => {
  const address = useTonAddress();
  return useMutation({
    mutationKey: ['pay-order', address],
    mutationFn: async (orderId: string) =>
      proxy.get('/api/web3/referral/payment-orders/pay', {
        schema: PaymentOrderSchema,
        params: {
          order_id: orderId,
        },
        headers: {
          'Wallet-Address': address,
        },
      }),
  });
};

const usePayAllOrders = () => {
  const address = useTonAddress();
  return useMutation({
    mutationKey: ['pay-all-orders', address],
    mutationFn: async (authorId: number) =>
      proxy.get('/api/web3/referral/payment-orders/pay-all', {
        schema: PaymentOrderSchema,
        params: {
          author_id: authorId,
        },
        headers: {
          'Wallet-Address': address,
        },
      }),
  });
};

export { usePayAllOrders, usePayOrder };
export type { PaymentOrder };
