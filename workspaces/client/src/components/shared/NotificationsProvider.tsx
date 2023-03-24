import { FC, memo, ReactNode, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNotificationStore } from '@client/stores/NotificationStore';

interface IProps {
  children: ReactNode;
}

const NotificationsProvider: FC<IProps> = ({ children }) => {
  const toast = useToast();

  const setToast = useNotificationStore((state) => state.setToast);

  useEffect(() => {
    setToast(toast);
  }, [setToast, toast]);

  return <>{children}</>;
};

export default memo(NotificationsProvider);
