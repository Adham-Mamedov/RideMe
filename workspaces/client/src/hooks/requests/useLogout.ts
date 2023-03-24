import { useRouter } from 'next/router';
import { useAxios } from '@client/hooks/useAxios';
import { useQuery } from 'react-query';
import { EReactQueryKeys, ERoute } from '@shared/enums';

const useLogout = () => {
  const router = useRouter();
  const axios = useAxios();

  return useQuery(
    EReactQueryKeys.logout,
    () => axios.post(`${ERoute.Auth}/logout`),
    {
      enabled: false,
      onError() {},
      onSuccess() {
        router.push('/');
      },
    }
  );
};

export default useLogout;
