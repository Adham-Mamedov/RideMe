import { FC, memo, ReactElement, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

import Page403 from '@client/components/shared/Page403';
import { useAuthStore } from '@client/stores/AuthStore';

import { ECookieNames } from '@shared/enums';
import { UserEntity } from '@server/modules/user/entities/user.entity';

interface IProps {
  children: ReactElement;
}

const AuthProvider: FC<IProps> = ({ children }) => {
  const isUserUnauthorized = useAuthStore((state) => state.isUnauthorized);
  const setUser = useAuthStore((state) => state.setUser);

  const toast = useToast();

  useEffect(() => {
    if (!globalThis?.document) return;

    const name = ECookieNames.UserCookieName;
    let parsed = document.cookie.split(';').reduce(
      (acc, cookie) => {
        const [key, value] = cookie.split('=').map((v) => v.trim());
        if (!key || key !== name) return acc;
        return { ...acc, [key]: JSON.parse(value || 'null') };
      },
      { [name]: null } as {
        [name]: UserEntity | null;
      }
    );

    setUser(parsed[name]);
  }, [setUser, globalThis?.document?.cookie]);

  useEffect(() => {
    if (isUserUnauthorized) {
      toast({
        title: 'Access Denied!',
        description: 'You are not authorized to access this page.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [isUserUnauthorized, toast]);

  return <>{isUserUnauthorized ? <Page403 /> : children}</>;
};

export default memo(AuthProvider);
