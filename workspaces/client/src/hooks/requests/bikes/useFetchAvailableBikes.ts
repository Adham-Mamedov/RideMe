import { useQuery } from 'react-query';

import { useAuthAxios } from '@client/hooks/useAuthAxios';
import { useGlobalStore } from '@client/stores/GlobalStore';

import { IBike } from '@shared/types/assets.types';
import { EReactQueryKeys, ERoute } from '@shared/enums';

const useFetchAvailableBikes = () => {
  const setGlobalBikes = useGlobalStore((state) => state.setBikes);

  const axios = useAuthAxios();

  return useQuery(
    EReactQueryKeys.availableBikes,
    () => axios.get<IBike[]>(ERoute.AvailableBikes).then(({ data }) => data),
    {
      onSuccess: (data) => {
        setGlobalBikes(data);
      },
    }
  );
};

export default useFetchAvailableBikes;
