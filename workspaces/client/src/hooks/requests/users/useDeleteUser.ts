import { useMutation, useQueryClient } from 'react-query';

import { useAuthAxios } from '@client/hooks/useAuthAxios';
import { useNotificationStore } from '@client/stores/NotificationStore';

import { IUser } from '@shared/types/auth.types';
import { EReactQueryKeys, ERoute } from '@shared/enums';

const useDeleteUser = () => {
  const displaySuccess = useNotificationStore((state) => state.displaySuccess);

  const queryClient = useQueryClient();
  const axios = useAuthAxios();

  return useMutation(
    EReactQueryKeys.usersDelete,
    (id: IUser['id']) =>
      axios
        .delete<boolean>(`${ERoute.Users}/delete`, {
          data: { id },
        })
        .then(({ data }) => data),
    {
      retry: 2,
      onSuccess: (success) => {
        success && displaySuccess({ message: 'User deleted' });
      },
      onMutate: async (id: IUser['id']) => {
        await queryClient.cancelQueries(EReactQueryKeys.users);

        const previousUsers = queryClient.getQueryData(EReactQueryKeys.users);

        queryClient.setQueryData(EReactQueryKeys.users, (old?: IUser[]) => {
          return old ? old.filter((user) => user.id !== id) : [];
        });

        return { previousUsers };
      },
      onError: (error, user, context) => {
        context &&
          queryClient.setQueryData(
            EReactQueryKeys.users,
            context.previousUsers
          );
      },
      onSettled: () => {
        queryClient.invalidateQueries(EReactQueryKeys.users);
      },
    }
  );
};

export default useDeleteUser;
