import NextImage from 'next/image';
import { Dispatch, FC, memo, SetStateAction, useMemo } from 'react';
import {
  Box,
  Button,
  chakra,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { MdDirectionsBike } from 'react-icons/md';

import { useGlobalStore } from '@client/stores/GlobalStore';

import { IStation } from '@shared/types/assets.types';

const Image = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    ['width', 'height', 'src', 'alt', 'style'].includes(prop),
});

interface IProps {
  station: IStation | null;
  setStation: Dispatch<SetStateAction<IStation | null>>;
}

const StationDrawer: FC<IProps> = ({ station, setStation }) => {
  const onClose = () => setStation(null);

  const getBikesByStationId = useGlobalStore(
    (state) => state.getBikesByStationId
  );

  const bikes = useMemo(
    () => (station ? getBikesByStationId(station.id) : []),
    [station, getBikesByStationId]
  );

  if (!station) return null;

  return (
    <Drawer
      id="station-drawer"
      isOpen={!!station}
      placement="bottom"
      size="2xl"
      orientation="vertical"
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{station.title}</DrawerHeader>

        <DrawerBody>
          <Box>
            <Text fontSize="1.125rem">Available Bikes</Text>
          </Box>
          <Tabs variant="unstyled">
            <TabList>
              {bikes.map((bike) => (
                <Tab key={bike.id}>{bike.title}</Tab>
              ))}
            </TabList>

            <TabPanels>
              {bikes.map((bike) => (
                <TabPanel key={bike.id}>
                  <Flex
                    gap={['0.5rem', '1rem']}
                    justify="start"
                    direction={['column', null, 'row']}
                  >
                    <Image
                      style={{
                        borderRadius: '1rem',
                        flexShrink: 0,
                        backgroundColor: '#f5f5f5',
                        objectFit: 'cover',
                      }}
                      src={bike.imageUrl}
                      alt={bike.title}
                      maxW={['100%', '100%', 250]}
                      maxH={[200, 250, 345]}
                      width={250}
                      height={345}
                    />
                    <Flex direction="column" gap="0.5rem">
                      <Heading as="h4" fontSize="1.125rem" color="primary">
                        {bike.title}
                      </Heading>
                      <Text
                        dangerouslySetInnerHTML={{
                          __html: bike.description,
                        }}
                      />
                      <Text>
                        Wheel size:{' '}
                        <Text as="span" fontWeight="600">
                          {bike.wheelSize}
                        </Text>
                      </Text>
                      <Text>
                        Recommended height (cm):{' '}
                        <Text as="span" fontWeight="600">
                          {bike.recommendedHeight}
                        </Text>
                      </Text>
                      <Text>
                        Free period:{' '}
                        <Text as="span" fontWeight="600">
                          {bike.freeMinutes} min
                        </Text>
                      </Text>
                      <Text>
                        Price per minute:{' '}
                        <Text as="span" fontWeight="600">
                          {bike.pricePerMinute} sum
                        </Text>
                      </Text>
                    </Flex>
                  </Flex>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </DrawerBody>

        <DrawerFooter>
          <Button
            variant="primary"
            colorScheme="messenger"
            gap="0.4rem"
            onClick={() => {}}
          >
            Rent
            <MdDirectionsBike size="1.75rem" />
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default memo(StationDrawer);
