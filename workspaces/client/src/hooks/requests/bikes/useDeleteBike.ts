import { useMutation, useQueryClient } from 'react-query';

import { useAuthAxios } from '@client/hooks/useAuthAxios';
import { useNotificationStore } from '@client/stores/NotificationStore';

import { IBike } from '@shared/types/assets.types';
import { EReactQueryKeys, ERoute } from '@shared/enums';

const useDeleteBike = () => {
  const displaySuccess = useNotificationStore((state) => state.displaySuccess);

  const queryClient = useQueryClient();
  const axios = useAuthAxios();

  return useMutation(
    EReactQueryKeys.bikesDelete,
    (id: IBike['id']) =>
      axios
        .delete<boolean>(`${ERoute.Bikes}/delete`, {
          data: { id },
        })
        .then(({ data }) => data),
    {
      retry: 2,
      onSuccess: (success) => {
        success && displaySuccess({ message: 'Bike deleted' });
      },
      onMutate: async (id: IBike['id']) => {
        await queryClient.cancelQueries(EReactQueryKeys.bikes);

        const previousBikes = queryClient.getQueryData(EReactQueryKeys.bikes);

        queryClient.setQueryData(EReactQueryKeys.bikes, (old?: IBike[]) => {
          return old ? old.filter((bike) => bike.id !== id) : [];
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

export default useDeleteBike;
