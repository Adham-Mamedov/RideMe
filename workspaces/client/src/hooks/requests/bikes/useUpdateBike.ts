import { useMutation, useQueryClient } from 'react-query';

import { useAuthAxios } from '@client/hooks/useAuthAxios';
import { useNotificationStore } from '@client/stores/NotificationStore';

import { IBike } from '@shared/types/assets.types';
import { EReactQueryKeys, ERoute } from '@shared/enums';

const useUpdateBike = () => {
  const displaySuccess = useNotificationStore((state) => state.displaySuccess);

  const queryClient = useQueryClient();
  const axios = useAuthAxios();

  return useMutation(
    EReactQueryKeys.bikesUpdate,
    (bike: IBike) =>
      axios.put<IBike>(`${ERoute.Bikes}/edit`, bike).then(({ data }) => data),
    {
      retry: 2,
      onSuccess: () => {
        displaySuccess({ message: 'Bike updated' });
      },
      onMutate: async (bike: IBike) => {
        await queryClient.cancelQueries(EReactQueryKeys.bikes);

        const previousBikes = queryClient.getQueryData(EReactQueryKeys.bikes);

        queryClient.setQueryData(EReactQueryKeys.bikes, (old?: IBike[]) => {
          if (!old) return old || [];
          const index = old.findIndex((s) => s.id === bike.id);
          if (index === -1) return old;
          const newBikes = [...old];
          newBikes[index] = bike;
          return newBikes;
        });

        return { previousBikes };
      },
      onError: (error, _, context) => {
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

export default useUpdateBike;
