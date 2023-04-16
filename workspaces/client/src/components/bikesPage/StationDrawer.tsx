import NextImage from 'next/image';
import {
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
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

import Loader from '@client/components/shared/Loader';
import QRCodeModal from '@client/components/shared/Navbar/QRCodeModal';

import { useGlobalStore } from '@client/stores/GlobalStore';
import { useNotificationStore } from '@client/stores/NotificationStore';
import { useCreateRide } from '@client/hooks/requests/rides';

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
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);

  const displayError = useNotificationStore((state) => state.displayError);
  const activeRide = useGlobalStore((state) => state.activeRide);
  const getBikesByStationId = useGlobalStore(
    (state) => state.getBikesByStationId
  );

  const { mutateAsync: rentBike, isLoading } = useCreateRide();

  const onClose = useCallback(() => setStation(null), [setStation]);

  const bikes = useMemo(
    () => (station ? getBikesByStationId(station.id) : []),
    [station, getBikesByStationId]
  );

  const noBikesAvailable = useMemo(() => bikes.length === 0, [bikes]);

  const handleRent = useCallback(async () => {
    if (activeRide) {
      return displayError({ message: 'You already have an active ride' });
    }
    if (station && bikes[activeTabIndex]) {
      try {
        await rentBike({
          stationFromId: station.id!,
          bikeId: bikes[activeTabIndex].id!,
        });
        setIsQRCodeModalOpen(false);
        onClose();
      } catch {}
    }
  }, [
    activeRide,
    station,
    bikes,
    activeTabIndex,
    rentBike,
    onClose,
    displayError,
  ]);

  useEffect(() => setActiveTabIndex(0), [station]);

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
      trapFocus={false}
    >
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{station.title}</DrawerHeader>

        <DrawerBody>
          <Box>
            <Text fontSize="1.125rem">Available Bikes</Text>
          </Box>
          {noBikesAvailable ? (
            <Text
              color="textGray"
              fontSize="1.5rem"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%)"
            >
              No bikes available
            </Text>
          ) : null}
          <Tabs
            variant="unstyled"
            index={activeTabIndex}
            onChange={(index) => setActiveTabIndex(index)}
          >
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
          {noBikesAvailable ? null : (
            <Button
              variant="primary"
              colorScheme="messenger"
              gap="0.4rem"
              onClick={() => setIsQRCodeModalOpen(true)}
              disabled={isLoading}
            >
              {isLoading ? <Loader size="32px" /> : 'Rent'}
              <MdDirectionsBike size="1.75rem" />
            </Button>
          )}
          <QRCodeModal onClose={handleRent} isOpen={isQRCodeModalOpen} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default memo(StationDrawer);
