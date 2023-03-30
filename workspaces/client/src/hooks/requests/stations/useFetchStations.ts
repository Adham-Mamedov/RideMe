import { useQuery } from 'react-query';

import { useAdminStore } from '@client/stores/AdminStore';
import { useGlobalStore } from '@client/stores/GlobalStore';
import { useAuthAxios } from '@client/hooks/useAuthAxios';

import { EReactQueryKeys, ERoute } from '@shared/enums';

const useFetchStations = () => {
  const setAdminStations = useAdminStore((state) => state.setStations);
  const setGlobalStations = useGlobalStore((state) => state.setStations);

  const axios = useAuthAxios();

  return useQuery(
    EReactQueryKeys.stations,
    () => axios.get(ERoute.Stations).then(({ data }) => data),
    {
      onSuccess: (data) => {
        setAdminStations(data);
        setGlobalStations(data);
      },
    }
  );
};

export default useFetchStations;
