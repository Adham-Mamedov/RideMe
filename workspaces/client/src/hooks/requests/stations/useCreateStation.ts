import { useMutation, useQueryClient } from 'react-query';

import { useAuthAxios } from '@client/hooks/useAuthAxios';
import { useNotificationStore } from '@client/stores/NotificationStore';

import { EReactQueryKeys, ERoute } from '@shared/enums';
import { IStation } from '@shared/types/assets.types';

const useCreateStation = () => {
  const displaySuccess = useNotificationStore((state) => state.displaySuccess);

  const queryClient = useQueryClient();
  const axios = useAuthAxios();

  return useMutation(
    EReactQueryKeys.stationsCreate,
    (station: IStation) =>
      axios
        .post<IStation>(`${ERoute.Stations}/create`, station)
        .then(({ data }) => data),
    {
      retry: 2,
      onSuccess: () => {
        displaySuccess({ message: 'Station created' });
      },
      onMutate: async (station: IStation) => {
        await queryClient.cancelQueries(EReactQueryKeys.stations);

        const previousStations = queryClient.getQueryData(
          EReactQueryKeys.stations
        );

        queryClient.setQueryData(
          EReactQueryKeys.stations,
          (old?: IStation[]) => {
            return old
              ? [...old, { id: '999', ...station }]
              : [{ id: '999', ...station }];
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

export default useCreateStation;
