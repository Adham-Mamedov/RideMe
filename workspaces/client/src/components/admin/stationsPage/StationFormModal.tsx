import dynamic from 'next/dynamic';
import {
  ChangeEvent,
  FC,
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Checkbox,
} from '@chakra-ui/react';

import { useAdminStore } from '@client/stores/AdminStore';

import { IStation } from '@shared/types/assets.types';
import { defaultStationData } from '@client/utils/defaults';

const Map = dynamic(
  () => import('@client/components/admin/stationsPage/SingleStationMap'),
  { ssr: false }
);

interface IProps {
  title: string;
  ctaText: string;
  isOpen: boolean;
  onClose: (station?: IStation) => void;
  station?: IStation;
}

const StationFormModal: FC<IProps> = ({
  title,
  ctaText,
  isOpen,
  onClose,
  station,
}) => {
  const [stationData, setStationData] = useState<IStation>(
    station || defaultStationData
  );

  const unAssignedBikes = useAdminStore((state) => state.unAssignedBikes);
  const getBikesByStationId = useAdminStore(
    (state) => state.getBikesByStationId
  );

  useEffect(() => {
    isOpen && setStationData(station || defaultStationData);
  }, [station, isOpen]);

  const bikeList = useMemo(
    () => [...getBikesByStationId(stationData.id), ...unAssignedBikes],
    [getBikesByStationId, stationData.id, unAssignedBikes]
  );

  const updateStationData = useCallback(
    (value: string | number[] | string[], key: string) => {
      setStationData((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    },
    []
  );

  const handleBikesSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>, id: string) => {
      const checked = e.currentTarget.checked;
      const selectedBikes = stationData.bikes as string[];
      const updatedBikes = checked
        ? [...selectedBikes, id]
        : selectedBikes.filter((bikeID) => bikeID !== id);
      updateStationData(updatedBikes, 'bikes');
    },
    [stationData.bikes, updateStationData]
  );

  const submitHandler = useCallback(
    (e: FormEvent<HTMLDivElement>) => {
      e.preventDefault();
      stationData.title.trim() && onClose(stationData);
    },
    [onClose, stationData]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          fontSize={['1rem', '1.5rem']}
          borderBottom="1px solid"
          borderColor="borderPrimary"
        >
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            as="form"
            id="station-form"
            flexDir="column"
            alignItems="center"
            gap={['1rem', '1.5rem']}
            onSubmit={submitHandler}
          >
            <FormControl isRequired>
              <FormLabel fontWeight={500}>Station Title</FormLabel>
              <Input
                value={stationData.title}
                onChange={(event) =>
                  updateStationData(event.currentTarget.value, 'title')
                }
                type="text"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight={500}>Station Location</FormLabel>
              <Box h="300px" w="100%" overflow="hidden">
                <Map
                  lat={stationData.location[0]}
                  lng={stationData.location[1]}
                  setPosition={(value: IStation['location']) => {
                    updateStationData(value, 'location');
                  }}
                />
              </Box>
            </FormControl>
            <FormControl>
              <FormLabel fontWeight={500}>Station Location</FormLabel>
              <List>
                {bikeList.length === 0 && (
                  <ListItem>No bikes available</ListItem>
                )}
                {bikeList.map((bike) => {
                  return (
                    <ListItem key={bike.id}>
                      <Box
                        p="0.5rem"
                        borderBottom="1px solid"
                        borderColor="borderPrimary"
                      >
                        <Checkbox
                          defaultChecked={stationData.bikes?.includes(bike.id!)}
                          onChange={(e) => handleBikesSelect(e, bike.id!)}
                        >
                          {bike.title}
                        </Checkbox>
                      </Box>
                    </ListItem>
                  );
                })}
              </List>
            </FormControl>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" variant="primary" form="station-form">
            {ctaText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(StationFormModal);
