import { proxy } from '@/shared/lib/proxy';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod/v4';

const addTransactionHash = async (orderId: string, trHash: string) => {
  const response = await proxy.post(
    `/api/web3/referral/payment-orders/add-hash`,
    {
      order_id: orderId,
      tr_hash: trHash,
    },
    {
      schema: z.object({
        message: z.string(),
      }),
    },
  );
  return response.message;
};

const useAddTransactionHash = (authorId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add-transaction-hash'],
    mutationFn: ({ orderId, trHash }: { orderId: string; trHash: string }) => addTransactionHash(orderId, trHash),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-orders', authorId] });
    },
  });
};

export { useAddTransactionHash };
