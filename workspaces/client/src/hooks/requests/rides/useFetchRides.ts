import { useQuery } from 'react-query';

import { useAuthAxios } from '@client/hooks/useAuthAxios';
import { useAdminStore } from '@client/stores/AdminStore';

import { EReactQueryKeys, ERoute } from '@shared/enums';
import { IRide } from '@shared/types/assets.types';

const useFetchUserRides = () => {
  const setAdminRides = useAdminStore((state) => state.setRides);

  const axios = useAuthAxios();

  return useQuery(
    EReactQueryKeys.rides,
    () => axios.get<IRide[]>(ERoute.Rides).then(({ data }) => data),
    {
      onSuccess: (data) => {
        setAdminRides(
          data.map((ride) => ({
            ...ride,
            timeStart: new Date(ride.timeStart),
            timeEnd: ride.timeEnd && new Date(ride.timeEnd),
          })) || []
        );
      },
    }
  );
};

export default useFetchUserRides;
