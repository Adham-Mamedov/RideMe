import { useQuery } from 'react-query';

import { useAdminStore } from '@client/stores/AdminStore';
import { useAuthAxios } from '@client/hooks/useAuthAxios';

import { EReactQueryKeys, ERoute } from '@shared/enums';

const useFetchStations = () => {
  const setStations = useAdminStore((state) => state.setStations);

  const axios = useAuthAxios();

  return useQuery(
    EReactQueryKeys.stations,
    () => axios.get(ERoute.Stations).then(({ data }) => data),
    {
      onSuccess: (data) => {
        setStations(data);
      },
    }
  );
};

export default useFetchStations;
