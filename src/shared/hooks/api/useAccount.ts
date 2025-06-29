import userMock from '@/shared/mocks/user.json';
import { UserSchema } from '@/shared/types/user';
import { AdditionalInformation, AdditionalInformationSchema } from '@shared/types/orders';
import { fetchData, validateResult } from '@shared/utils/zod.utils';
import { useQuery } from '@tanstack/react-query';

const useAccount = () =>
  useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      // const userAccount = localStorage.getItem('user-logged-in');
      const userAccountMock = validateResult(JSON.parse(JSON.stringify(userMock)), UserSchema);

      const user = await fetchData<AdditionalInformation>({
        method: 'GET',
        url: `/api/web2/referral/referrer/${userAccountMock.user_id}`,
        schema: AdditionalInformationSchema,
      });

      return user;
    },
  });

export { useAccount };
