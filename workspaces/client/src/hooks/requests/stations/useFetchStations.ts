import { useQuery } from 'react-query';

import { useAdminStore } from '@client/stores/AdminStore';
import { useGlobalStore } from '@client/stores/GlobalStore';
import { useAuthStore } from '@client/stores/AuthStore';
import { useAuthAxios } from '@client/hooks/useAuthAxios';

import { EReactQueryKeys, ERoute } from '@shared/enums';

const useFetchStations = () => {
  const setAdminStations = useAdminStore((state) => state.setStations);
  const setGlobalStations = useGlobalStore((state) => state.setStations);
  const user = useAuthStore((state) => state.user);

  const axios = useAuthAxios(!user);

  return useQuery(
    [EReactQueryKeys.stations, !user],
    ({ queryKey: params }) => {
      const isDisabled = params[1];
      return isDisabled
        ? []
        : axios.get(ERoute.Stations).then(({ data }) => data);
    },
    {
      onSuccess: (data) => {
        setAdminStations(data);
        setGlobalStations(data);
      },
    }
  );
};

export default useFetchStations;
