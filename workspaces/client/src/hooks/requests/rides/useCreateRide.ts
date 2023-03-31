import { useMutation, useQueryClient } from 'react-query';

import { useAuthAxios } from '@client/hooks/useAuthAxios';
import { useNotificationStore } from '@client/stores/NotificationStore';

import { CreateRideDto } from '@server/modules/ride/dto/ride.dto';
import { EReactQueryKeys, ERoute } from '@shared/enums';
import { IRide } from '@shared/types/assets.types';

const useCreateRide = () => {
  const displaySuccess = useNotificationStore((state) => state.displaySuccess);

  const queryClient = useQueryClient();
  const axios = useAuthAxios();

  return useMutation(
    EReactQueryKeys.ridesCreate,
    (ride: CreateRideDto) =>
      axios
        .post<IRide>(`${ERoute.Rides}/create`, ride)
        .then(({ data }) => data),
    {
      retry: 2,
      onSuccess: () => {
        displaySuccess({ message: 'Ride Started' });
      },
      onMutate: async (ride: CreateRideDto) => {
        await queryClient.cancelQueries(EReactQueryKeys.userRides);

        const previousRides = queryClient.getQueryData(
          EReactQueryKeys.userRides
        );

        queryClient.setQueryData(EReactQueryKeys.userRides, (old?: IRide[]) => {
          const newRide = {
            id: '999',
            ...ride,
            timeEnd: null,
            timeStart: new Date(),
            userId: '111',
            cost: 0,
            distance: 0,
            stationToId: null,
            bikeId: '999',
          };
          return old ? [...old, newRide] : [newRide];
        });

        return { previousRides };
      },
      onError: (error, ride, context) => {
        context &&
          queryClient.setQueryData(
            EReactQueryKeys.userRides,
            context.previousRides
          );
      },
      onSettled: () => {
        queryClient.invalidateQueries(EReactQueryKeys.stations);
        queryClient.invalidateQueries(EReactQueryKeys.bikes);
        queryClient.invalidateQueries(EReactQueryKeys.availableBikes);
        queryClient.invalidateQueries(EReactQueryKeys.userRides);
      },
    }
  );
};

export default useCreateRide;
