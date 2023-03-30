import { FC, memo, ReactNode, useEffect } from 'react';

import { useGlobalStore } from '@client/stores/GlobalStore';
import { useFetchStations } from '@client/hooks/requests/stations';
import { useFetchAvailableBikes } from '@client/hooks/requests/bikes';

interface IProps {
  children?: ReactNode;
}

const GlobalProvider: FC<IProps> = ({ children }) => {
  const { isLoading: bikeLoading } = useFetchAvailableBikes();
  const { isLoading: stationsLoading } = useFetchStations();
  const setLoading = useGlobalStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(bikeLoading || stationsLoading);
  }, [bikeLoading, stationsLoading]);

  return <>{children}</>;
};

export default memo(GlobalProvider);
