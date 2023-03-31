import { useQuery } from 'react-query';

import { useGlobalStore } from '@client/stores/GlobalStore';
import { useAuthStore } from '@client/stores/AuthStore';
import { useAuthAxios } from '@client/hooks/useAuthAxios';

import { EReactQueryKeys, ERoute } from '@shared/enums';
import { IRide } from '@shared/types/assets.types';

const useFetchUserRides = () => {
  const setGlobalRides = useGlobalStore((state) => state.setRides);
  const setActiveRide = useGlobalStore((state) => state.setActiveRide);
  const user = useAuthStore((state) => state.user);

  const axios = useAuthAxios(!user);

  return useQuery(
    [EReactQueryKeys.userRides, !user],
    ({ queryKey: params }) => {
      const isDisabled = params[1];
      return isDisabled
        ? []
        : axios.get<IRide[]>(ERoute.RidesByUser).then(({ data }) => data);
    },
    {
      onSuccess: (data) => {
        const formattedData =
          data.map((ride) => ({
            ...ride,
            timeStart: new Date(ride.timeStart),
            timeEnd: ride.timeEnd && new Date(ride.timeEnd),
          })) || [];
        setGlobalRides(formattedData);
        setActiveRide(
          formattedData.find((ride) => ride.timeEnd === null) || null
        );
      },
    }
  );
};

export default useFetchUserRides;
