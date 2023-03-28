import { useMutation, useQueryClient } from 'react-query';

import { useAuthAxios } from '@client/hooks/useAuthAxios';
import { useNotificationStore } from '@client/stores/NotificationStore';

import { IStation } from '@shared/types/assets.types';
import { EReactQueryKeys, ERoute } from '@shared/enums';

const useDeleteStation = () => {
  const displaySuccess = useNotificationStore((state) => state.displaySuccess);

  const queryClient = useQueryClient();
  const axios = useAuthAxios();

  return useMutation(
    EReactQueryKeys.stationsDelete,
    (id: IStation['id']) =>
      axios
        .delete<boolean>(`${ERoute.Stations}/delete`, {
          data: { id },
        })
        .then(({ data }) => data),
    {
      retry: 2,
      onSuccess: (success) => {
        success && displaySuccess({ message: 'Station deleted' });
      },
      onMutate: async (id: IStation['id']) => {
        await queryClient.cancelQueries(EReactQueryKeys.stations);

        const previousStations = queryClient.getQueryData(
          EReactQueryKeys.stations
        );

        queryClient.setQueryData(
          EReactQueryKeys.stations,
          (old?: IStation[]) => {
            return old ? old.filter((station) => station.id !== id) : [];
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

export default useDeleteStation;
