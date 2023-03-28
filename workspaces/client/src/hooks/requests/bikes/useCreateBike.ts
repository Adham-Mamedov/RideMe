import { useMutation, useQueryClient } from 'react-query';

import { useAuthAxios } from '@client/hooks/useAuthAxios';
import { useNotificationStore } from '@client/stores/NotificationStore';

import { EReactQueryKeys, ERoute } from '@shared/enums';
import { IBike } from '@shared/types/assets.types';

const useCreateBike = () => {
  const displaySuccess = useNotificationStore((state) => state.displaySuccess);

  const queryClient = useQueryClient();
  const axios = useAuthAxios();

  return useMutation(
    EReactQueryKeys.bikesCreate,
    (bike: IBike) =>
      axios
        .post<IBike>(`${ERoute.Bikes}/create`, bike)
        .then(({ data }) => data),
    {
      retry: 2,
      onSuccess: () => {
        displaySuccess({ message: 'Bike created' });
      },
      onMutate: async (bike: IBike) => {
        await queryClient.cancelQueries(EReactQueryKeys.bikes);

        const previousBikes = queryClient.getQueryData(EReactQueryKeys.bikes);

        queryClient.setQueryData(EReactQueryKeys.bikes, (old?: IBike[]) => {
          return old
            ? [...old, { id: '999', ...bike }]
            : [{ id: '999', ...bike }];
        });

        return { previousBikes };
      },
      onError: (error, bike, context) => {
        context &&
          queryClient.setQueryData(
            EReactQueryKeys.bikes,
            context.previousBikes
          );
      },
      onSettled: () => {
        queryClient.invalidateQueries(EReactQueryKeys.stations);
        queryClient.invalidateQueries(EReactQueryKeys.bikes);
      },
    }
  );
};

export default useCreateBike;
