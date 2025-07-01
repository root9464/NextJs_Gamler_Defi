import { apiProxy } from '@/shared/lib/axios';
import { useMutation } from '@tanstack/react-query';

type PingResponse = {
  message: string;
};

export const usePing = () =>
  useMutation({
    mutationKey: ['ping'],
    mutationFn: async () => {
      const { data, status, statusText } = await apiProxy.get<PingResponse>('/api/web3/ping');
      if (status < 200 || status >= 300) {
        throw new Error(statusText || `Request failed with status ${status}`);
      }
      return data;
    },
  });
