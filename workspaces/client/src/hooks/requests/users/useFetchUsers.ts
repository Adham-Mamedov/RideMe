import { useQuery } from 'react-query';

import { useAdminStore } from '@client/stores/AdminStore';
import { useAuthAxios } from '@client/hooks/useAuthAxios';

import { EReactQueryKeys, ERoute } from '@shared/enums';

const useFetchUsers = () => {
  const setAdminUsers = useAdminStore((state) => state.setUsers);

  const axios = useAuthAxios();

  return useQuery(
    EReactQueryKeys.users,
    () => {
      return axios.get(ERoute.Users).then(({ data }) => data);
    },
    {
      onSuccess: (data) => {
        setAdminUsers(data);
      },
    }
  );
};

export default useFetchUsers;
