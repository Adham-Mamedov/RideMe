import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';

import { useAuthStore } from '@client/stores/AuthStore';
import { EReactQueryKeys, ERoute } from '@shared/enums';
import { SuccessEntity } from '@server/common/entities/common.entities';

export const useAuthAxios = () => {
  const instance = axios.create({ baseURL: ERoute.Api });
  const router = useRouter();

  const setIsUnauthorized = useAuthStore((state) => state.setIsUnauthorized);

  const { refetch: refreshAuthToken } = useQuery<{ data: SuccessEntity }>(
    EReactQueryKeys.refreshToken,
    () => {
      return instance.get(`${ERoute.Auth}/refresh`);
    },
    {
      retry: false,
      enabled: false,
      onError(error) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
          const urlParams = encodeURIComponent(router.asPath);
          router.replace(`/login?back=${urlParams}`);
        }
      },
    }
  );

  instance.interceptors.response.use(undefined, (error: AxiosError) => {
    if (error.response?.status === 403) {
      setIsUnauthorized(true);
    } else if (error.response?.status === 401) {
      refreshAuthToken();
    }
    throw error;
  });

  useEffect(() => {
    instance
      .get<SuccessEntity>(`${ERoute.Auth}/test`)
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          refreshAuthToken();
        }
      });
  }, []);

  return useRef(instance).current;
};
