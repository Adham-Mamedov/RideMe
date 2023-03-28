import { useMutation, useQueryClient } from 'react-query';

import { useAuthAxios } from '@client/hooks/useAuthAxios';
import { useNotificationStore } from '@client/stores/NotificationStore';

import { IStation } from '@shared/types/assets.types';
import { EReactQueryKeys, ERoute } from '@shared/enums';

const useUpdateStation = () => {
  const displaySuccess = useNotificationStore((state) => state.displaySuccess);

  const queryClient = useQueryClient();
  const axios = useAuthAxios();

  return useMutation(
    EReactQueryKeys.stationsUpdate,
    (station: IStation) =>
      axios
        .put<IStation>(`${ERoute.Stations}/edit`, station)
        .then(({ data }) => data),
    {
      retry: 2,
      onSuccess: () => {
        displaySuccess({ message: 'Station updated' });
      },
      onMutate: async (station: IStation) => {
        await queryClient.cancelQueries(EReactQueryKeys.stations);

        const previousStations = queryClient.getQueryData(
          EReactQueryKeys.stations
        );

        queryClient.setQueryData(
          EReactQueryKeys.stations,
          (old?: IStation[]) => {
            if (!old) return old || [];
            const index = old.findIndex((s) => s.id === station.id);
            if (index === -1) return old;
            const newStations = [...old];
            newStations[index] = station;
            return newStations;
          }
        );

        return { previousStations };
      },
      onError: (error, station, context) => {
        context &&
          queryClient.setQueryData(
            EReactQueryKeys.stations,
            context.previousStations
          );
      },
      onSettled: () => {
        queryClient.invalidateQueries(EReactQueryKeys.stations);
        queryClient.invalidateQueries(EReactQueryKeys.bikes);
      },
    }
  );
};

export default useUpdateStation;
