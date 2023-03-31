import { FC, memo, ReactNode, useEffect } from 'react';

import { useGlobalStore } from '@client/stores/GlobalStore';
import { useFetchStations } from '@client/hooks/requests/stations';
import { useFetchAvailableBikes } from '@client/hooks/requests/bikes';
import { useFetchUserRides } from '../../../hooks/requests/rides';

interface IProps {
  children?: ReactNode;
}

const GlobalProvider: FC<IProps> = ({ children }) => {
  const { isLoading: bikeLoading } = useFetchAvailableBikes();
  const { isLoading: stationsLoading } = useFetchStations();
  const { isLoading: ridesLoading } = useFetchUserRides();
  const setLoading = useGlobalStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(bikeLoading || stationsLoading || ridesLoading);
  }, [setLoading, bikeLoading, stationsLoading, ridesLoading]);

  return <>{children}</>;
};

export default memo(GlobalProvider);
