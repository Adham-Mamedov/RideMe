import { FC, memo, ReactNode, useEffect } from 'react';
import { useAdminStore } from '@client/stores/AdminStore';
import { useFetchBikes } from '@client/hooks/requests/bikes';
import { useFetchStations } from '@client/hooks/requests/stations';

interface IProps {
  children?: ReactNode;
}

const AdminProvider: FC<IProps> = ({ children }) => {
  const { isLoading: bikeLoading } = useFetchBikes();
  const { isLoading: stationsLoading } = useFetchStations();
  const setLoading = useAdminStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(bikeLoading || stationsLoading);
  }, [bikeLoading, stationsLoading]);

  return <>{children}</>;
};

export default memo(AdminProvider);
