import { apiProxy } from '@/shared/lib/axios';
import { fetchData } from '@shared/utils/zod.utils';
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
      fetchData<PaymentOrder>({
        method: 'GET',
        url: `/api/web3/referral/payment-orders/pay`,
        schema: PaymentOrderSchema,
        params: {
          order_id: orderId,
        },
        headers: {
          'Wallet-Address': address,
        },
        instance: apiProxy,
      }),
  });
};

const usePayAllOrders = () => {
  const address = useTonAddress();
  return useMutation({
    mutationKey: ['pay-all-orders', address],
    mutationFn: async (authorId: number) =>
      fetchData<PaymentOrder>({
        method: 'GET',
        url: `/api/web3/referral/payment-orders/all`,
        schema: PaymentOrderSchema,
        params: {
          author_id: authorId,
        },
        headers: {
          'Wallet-Address': address,
        },
        instance: apiProxy,
      }),
  });
};

export { usePayAllOrders, usePayOrder };
export type { PaymentOrder };
