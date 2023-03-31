import { useMutation, useQueryClient } from 'react-query';

import { useAuthAxios } from '@client/hooks/useAuthAxios';
import { useNotificationStore } from '@client/stores/NotificationStore';

import { IRide } from '@shared/types/assets.types';
import { EReactQueryKeys, ERoute } from '@shared/enums';
import { EditRideDto } from '@server/modules/ride/dto/ride.dto';
import { useGlobalStore } from '@client/stores/GlobalStore';

const useUpdateRide = () => {
  const displaySuccess = useNotificationStore((state) => state.displaySuccess);
  const setPostRide = useGlobalStore((state) => state.setPostRide);

  const queryClient = useQueryClient();
  const axios = useAuthAxios();

  return useMutation(
    EReactQueryKeys.ridesUpdate,
    (ride: EditRideDto) =>
      axios.put<IRide>(`${ERoute.Rides}/edit`, ride).then(({ data }) => data),
    {
      retry: 2,
      onSuccess: () => {
        displaySuccess({ message: 'Ride Finished' });
      },
      onMutate: async (ride: EditRideDto) => {
        await queryClient.cancelQueries(EReactQueryKeys.userRides);

        const previousRides = queryClient.getQueryData(
          EReactQueryKeys.userRides
        );

        queryClient.setQueryData(EReactQueryKeys.userRides, (old?: IRide[]) => {
          if (!old) return old || [];
          const index = old.findIndex((s) => s.id === ride.id);
          if (index === -1) return old;
          const newRides = [...old];
          newRides[index] = {
            ...ride,
            timeEnd: new Date(),
            timeStart: new Date(),
            userId: '111',
            cost: 0,
            stationFromId: '999',
            bikeId: '999',
          };
          return newRides;
        });

        return { previousRides };
      },
      onError: (error, _, context) => {
        context &&
          queryClient.setQueryData(
            EReactQueryKeys.userRides,
            context.previousRides
          );
      },
      onSettled: (ride?: IRide) => {
        queryClient.invalidateQueries(EReactQueryKeys.stations);
        queryClient.invalidateQueries(EReactQueryKeys.bikes);
        queryClient.invalidateQueries(EReactQueryKeys.availableBikes);
        queryClient.invalidateQueries(EReactQueryKeys.userRides);
        if (!ride) return;
        setPostRide({
          ...ride,
          timeStart: new Date(ride.timeStart),
          timeEnd: ride.timeEnd && new Date(ride.timeEnd),
        });
      },
    }
  );
};

export default useUpdateRide;
