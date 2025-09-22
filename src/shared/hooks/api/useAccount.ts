import { proxy } from '@/shared/lib/proxy';
import { UserSchema } from '@/shared/types/user';
import type { Extend } from '@/shared/types/utils';
// import accountDataMock from '@shared/mocks/user.json';
import type { AdditionalInformation } from '@shared/types/orders';
import { AdditionalInformationSchema } from '@shared/types/orders';
import { validateResult } from '@shared/utils/zod.utils';
import { useQuery } from '@tanstack/react-query';

type Account = Extend<
  AdditionalInformation,
  {
    // user_photo_url: string;
    coins_number: number;
    player_likes_number: number;
    host_likes_number: number;
  }
>;

const fetchAccount = async () => {
  const localAccountData = localStorage.getItem('user-logged-in');
  const userAccount = validateResult(JSON.parse(localAccountData ?? '{}'), UserSchema);
  // const userAccount = validateResult(accountDataMock, UserSchema);
  const user = await proxy.get<AdditionalInformation>(`/api/web2/referral/referrer/${userAccount.user_id}`, {
    schema: AdditionalInformationSchema,
  });

  // const user_photo = await proxy.get<Blob>(`/api/web2/user/${userAccount.photo_path}`, {
  //   responseType: 'blob',
  // });

  // const user_photo_url = URL.createObjectURL(user_photo);

  const account: Account = {
    ...user,
    // user_photo_url: user_photo_url,
    coins_number: userAccount.coins_number,
    player_likes_number: userAccount.player_likes_number,
    host_likes_number: userAccount.host_likes_number,
  };

  return account;
};

const useAccount = () =>
  useQuery({
    queryKey: ['account'],
    queryFn: fetchAccount,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

export { useAccount };
export type { Account };
