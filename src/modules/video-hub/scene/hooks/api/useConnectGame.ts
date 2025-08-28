import { useQuery } from '@tanstack/react-query';

export const useConnectGame = (sessionId: number, account_id: number) => {
  useQuery({
    queryKey: ['connect-game', sessionId, account_id],
    queryFn: async () => {
      console.log('useConnectGame', sessionId, account_id);

      return null;
    },
  });
};
