import { useMutation } from 'react-query';

import { useAuthAxios } from '@client/hooks/useAuthAxios';
import { useNotificationStore } from '@client/stores/NotificationStore';
import { useAuthStore } from '@client/stores/AuthStore';

import { CreateCommentDto } from '@server/modules/comment/dto/comment.dto';
import { EReactQueryKeys, ERoute } from '@shared/enums';
import { IComment } from '@shared/types/assets.types';

const useCreateComment = () => {
  const displaySuccess = useNotificationStore((state) => state.displaySuccess);
  const user = useAuthStore((state) => state.user);

  const axios = useAuthAxios(!user);

  return useMutation(
    EReactQueryKeys.commentsCreate,
    (comment: CreateCommentDto) =>
      axios
        .post<IComment>(`${ERoute.Comments}/create`, comment)
        .then(({ data }) => data),
    {
      retry: 2,
      onSuccess: () => {
        displaySuccess({ message: 'Comment saved' });
      },
    }
  );
};

export default useCreateComment;
