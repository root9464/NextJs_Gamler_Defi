import { apiProxy } from '@/shared/lib/axios';
import { userMock } from '@/shared/mocks/user.json';
import { UserSchema } from '@/shared/types/user';
import type { AdditionalInformation } from '@shared/types/orders';
import { AdditionalInformationSchema } from '@shared/types/orders';
import { fetchData, validateResult } from '@shared/utils/zod.utils';
import { useQuery } from '@tanstack/react-query';

const useAccount = () =>
  useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      // const userAccount = localStorage.getItem('user-logged-in');
      const userAccountMock = validateResult(userMock, UserSchema);

      const user = await fetchData<AdditionalInformation>({
        method: 'GET',
        url: `/api/web2/referral/referrer/${userAccountMock.user_id}`,
        schema: AdditionalInformationSchema,
        instance: apiProxy,
      });

      console.log(user, 'user');

      return user;
    },
  });

export { useAccount };
