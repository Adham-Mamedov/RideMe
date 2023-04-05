import { useMutation, useQueryClient } from 'react-query';

import { useAuthAxios } from '@client/hooks/useAuthAxios';
import { useNotificationStore } from '@client/stores/NotificationStore';

import { IUser } from '@shared/types/auth.types';
import { EReactQueryKeys, ERoute } from '@shared/enums';

const useUpdateUser = () => {
  const displaySuccess = useNotificationStore((state) => state.displaySuccess);

  const queryClient = useQueryClient();
  const axios = useAuthAxios();

  return useMutation(
    EReactQueryKeys.usersUpdate,
    (user: IUser) =>
      axios.put<IUser>(`${ERoute.Users}/edit`, user).then(({ data }) => data),
    {
      retry: 2,
      onSuccess: () => {
        displaySuccess({ message: 'User updated' });
      },
      onMutate: async (user: IUser) => {
        await queryClient.cancelQueries(EReactQueryKeys.users);

        const previousUsers = queryClient.getQueryData(EReactQueryKeys.users);

        queryClient.setQueryData(EReactQueryKeys.users, (old?: IUser[]) => {
          if (!old) return old || [];
          const index = old.findIndex((s) => s.id === user.id);
          if (index === -1) return old;
          const newUsers = [...old];
          newUsers[index] = user;
          return newUsers;
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

export default useUpdateUser;
