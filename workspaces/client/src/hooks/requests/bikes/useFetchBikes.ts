import { useQuery } from 'react-query';

import { useAuthAxios } from '@client/hooks/useAuthAxios';
import { useAdminStore } from '@client/stores/AdminStore';
import { useGlobalStore } from '@client/stores/GlobalStore';

import { IBike } from '@shared/types/assets.types';
import { EReactQueryKeys, ERoute } from '@shared/enums';

const useFetchBikes = () => {
  const setAdminBikes = useAdminStore((state) => state.setBikes);
  const setGlobalBikes = useGlobalStore((state) => state.setBikes);

  const axios = useAuthAxios();

  return useQuery(
    EReactQueryKeys.bikes,
    () => axios.get<IBike[]>(ERoute.Bikes).then(({ data }) => data),
    {
      onSuccess: (data) => {
        setAdminBikes(data);
        setGlobalBikes(data);
      },
    }
  );
};

export default useFetchBikes;
