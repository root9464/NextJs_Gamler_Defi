import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type PingResponse = {
  message: string;
};

export const usePing = () =>
  useQuery({
    queryKey: ['ping'],
    queryFn: async () => {
      const { data, status, statusText } = await axios.get<PingResponse>('/api/web3/ping');
      if (status < 200 || status >= 300) {
        throw new Error(statusText || `Request failed with status ${status}`);
      }
      return data;
    },
  });
