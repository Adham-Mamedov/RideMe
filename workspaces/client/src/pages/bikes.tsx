import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import { useCallback, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { useGlobalStore } from '@client/stores/GlobalStore';

import ClientPrimaryLayout from '@client/components/shared/layouts/ClientPrimary';
import StationsSideBar from '@client/components/bikesPage/StationsSideBar';
import StationDrawer from '@client/components/bikesPage/StationDrawer';

import { IStation } from '@shared/types/assets.types';

const Map = dynamic(() => import('@client/components/bikesPage/StationsMap'), {
  ssr: false,
});

const HomePage: NextPage = () => {
  const [activeStation, setActiveStation] = useState<IStation | null>(null);

  const navBarHeight = useGlobalStore((state) => state.navBarHeight);

  const showStationDetails = useCallback((station: IStation) => {
    setActiveStation(station);
  }, []);

  const pageHeight = `calc(100vh - ${navBarHeight}px)`;

  return (
    <ClientPrimaryLayout authRequired>
      <Flex minH={pageHeight}>
        <StationsSideBar
          onClick={showStationDetails}
          activeStation={activeStation}
        />
        <Box w="100%" minH="pageHeight" overflow="hidden" position="relative">
          <Map
            activeStation={activeStation}
            onLocationClick={showStationDetails}
          />
          <StationDrawer
            station={activeStation}
            setStation={setActiveStation}
          />
        </Box>
      </Flex>
    </ClientPrimaryLayout>
  );
};

export default HomePage;
