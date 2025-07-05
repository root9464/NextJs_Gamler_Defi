import { proxy } from '@/shared/lib/proxy';
import { userMock } from '@/shared/mocks/user.json';
import { UserSchema } from '@/shared/types/user';
import type { Extend } from '@/shared/types/utils';
import type { AdditionalInformation } from '@shared/types/orders';
import { AdditionalInformationSchema } from '@shared/types/orders';
import { validateResult } from '@shared/utils/zod.utils';
import { useQuery } from '@tanstack/react-query';

type Account = Extend<
  AdditionalInformation,
  {
    user_photo_url: string;
    coins_number: number;
    player_likes_number: number;
    host_likes_number: number;
  }
>;

const fetchAccount = async () => {
  // const userAccount = localStorage.getItem('user-logged-in');
  const userAccountMock = validateResult(userMock, UserSchema);

  const user = await proxy.get<AdditionalInformation>(`/api/web2/referral/referrer/${userAccountMock.user_id}`, {
    schema: AdditionalInformationSchema,
  });

  const user_photo = await proxy.get<Blob>(`/api/web2/user/${userAccountMock.photo_path}`, {
    responseType: 'blob',
  });

  const user_photo_url = URL.createObjectURL(user_photo);

  const account: Account = {
    ...user,
    user_photo_url: user_photo_url,
    coins_number: userAccountMock.coins_number,
    player_likes_number: userAccountMock.player_likes_number,
    host_likes_number: userAccountMock.host_likes_number,
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
