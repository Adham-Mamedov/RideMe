import { useRef } from 'react';
import axios from 'axios';

import { ERoute } from '@shared/enums';
import { useNotificationStore } from '@client/stores/NotificationStore';

export const useAxios = () => {
  const instance = axios.create({ baseURL: ERoute.Api });
  const displayError = useNotificationStore((state) => state.displayError);

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      displayError({
        title: 'Registration failed!',
        message: error.response?.data?.message || 'Something went wrong!',
      });
      throw error;
    }
  );

  return useRef(instance).current;
};
