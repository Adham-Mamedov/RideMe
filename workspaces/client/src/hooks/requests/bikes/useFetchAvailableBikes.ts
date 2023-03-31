import { useQuery } from 'react-query';

import { useAuthAxios } from '@client/hooks/useAuthAxios';
import { useGlobalStore } from '@client/stores/GlobalStore';
import { useAuthStore } from '@client/stores/AuthStore';

import { IBike } from '@shared/types/assets.types';
import { EReactQueryKeys, ERoute } from '@shared/enums';

const useFetchAvailableBikes = () => {
  const setGlobalBikes = useGlobalStore((state) => state.setBikes);
  const user = useAuthStore((state) => state.user);

  const axios = useAuthAxios(!user);

  return useQuery(
    [EReactQueryKeys.availableBikes, !user],
    ({ queryKey: params }) => {
      const isDisabled = params[1];
      return isDisabled
        ? []
        : axios.get<IBike[]>(ERoute.AvailableBikes).then(({ data }) => data);
    },
    {
      onSuccess: (data) => {
        setGlobalBikes(data);
      },
    }
  );
};

export default useFetchAvailableBikes;
