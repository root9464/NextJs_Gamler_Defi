import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type DollarRateResponse = {
  result: string;
  provider: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  time_eol_unix: number;
  base_code: string;
  rates: Record<string, number>;
};

const getRate = (rates: Record<string, number>, currency: string) => {
  return rates[currency] ?? 0;
};

const useDollarRate = () =>
  useQuery({
    queryKey: ['dollar-rate'],
    queryFn: async () => {
      const { data, status, statusText } = await axios.get<DollarRateResponse>('https://open.er-api.com/v6/latest/USD');
      if (status < 200 || status >= 300) {
        throw new Error(statusText || `Request failed with status ${status}`);
      }
      return data;
    },
    select: (data) => ({
      usd: getRate(data.rates, 'USD'),
      rub: getRate(data.rates, 'RUB'),
      lastUpdated: new Date(),
    }),

    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });

export { useDollarRate };
export type { DollarRateResponse };
