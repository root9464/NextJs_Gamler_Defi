import { proxy } from '@/shared/lib/proxy';
import { useQuery } from '@tanstack/react-query';

type Account = {
  address: string;
  is_scam: boolean;
  is_wallet: boolean;
  name?: string;
  icon?: string;
};

type SimplePreview = {
  name: string;
  description: string;
  value: string;
  value_image?: string;
  accounts: Account[];
};

type JettonInfo = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  image: string;
  verification: string;
  score: number;
};

type TonTransfer = {
  sender: Account;
  recipient: Account;
  amount: number;
  comment?: string;
};

type SmartContractExec = {
  executor: Account;
  contract: Account;
  ton_attached: number;
  operation: string;
};

type JettonTransfer = {
  sender: Account;
  recipient: Account;
  senders_wallet: string;
  recipients_wallet: string;
  amount: string;
  comment?: string;
  jetton: JettonInfo;
};

type Action =
  | { type: 'TonTransfer'; status: string; TonTransfer: TonTransfer; simple_preview: SimplePreview; base_transactions: string[] }
  | { type: 'JettonTransfer'; status: string; JettonTransfer: JettonTransfer; simple_preview: SimplePreview; base_transactions: string[] }
  | {
      type: 'SmartContractExec';
      status: string;
      SmartContractExec: SmartContractExec;
      simple_preview: SimplePreview;
      base_transactions: string[];
    }
  | { type: string; status: string; simple_preview: SimplePreview; base_transactions: string[]; [key: string]: unknown };

type Event = {
  event_id: string;
  account: Account;
  timestamp: number;
  actions: Action[];
  is_scam: boolean;
  lt: number;
  in_progress: boolean;
  extra: number;
};

type ResponseGetTrHistory = {
  events: Event[];
  next_from: number;
};

const useGetTransactions = (address: string) => {
  return useQuery({
    queryKey: ['transactions', address],
    enabled: !!address,
    queryFn: async () => {
      const tokens = await proxy.get<ResponseGetTrHistory>(`/api/ton/accounts/${address}/events`, {
        params: {
          initiator: true,
          subject_only: false,
          limit: 100,
        },
      });
      return tokens;
    },
  });
};

export { useGetTransactions };
export type { Action, Event, JettonTransfer, ResponseGetTrHistory, SimplePreview };
