import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { useAxios } from '@client/hooks/useAxios';
import { useGlobalStore } from '@client/stores/GlobalStore';

import { EReactQueryKeys, ERoute } from '@shared/enums';
import { useAuthStore } from '@client/stores/AuthStore';

const useLogout = () => {
  const setActiveRide = useGlobalStore((state) => state.setActiveRide);
  const setUser = useAuthStore((state) => state.setUser);

  const router = useRouter();
  const axios = useAxios();

  return useQuery(
    EReactQueryKeys.logout,
    () => axios.post(`${ERoute.Auth}/logout`),
    {
      enabled: false,
      onSuccess() {
        setUser(null);
        setActiveRide(null);
        router.push('/');
      },
    }
  );
};

export default useLogout;
