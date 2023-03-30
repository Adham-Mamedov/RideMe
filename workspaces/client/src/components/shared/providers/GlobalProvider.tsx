import { FC, memo, ReactNode, useEffect } from 'react';

import { useGlobalStore } from '@client/stores/GlobalStore';
import { useFetchBikes } from '@client/hooks/requests/bikes';
import { useFetchStations } from '@client/hooks/requests/stations';

interface IProps {
  children?: ReactNode;
}

const GlobalProvider: FC<IProps> = ({ children }) => {
  const { isLoading: bikeLoading } = useFetchBikes();
  const { isLoading: stationsLoading } = useFetchStations();
  const setLoading = useGlobalStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(bikeLoading || stationsLoading);
  }, [bikeLoading, stationsLoading]);

  return <>{children}</>;
};

export default memo(GlobalProvider);
