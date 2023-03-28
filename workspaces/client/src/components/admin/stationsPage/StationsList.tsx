import { FC, memo, useMemo, useState } from 'react';
import {
  Button,
  Container,
  Heading,
  Text,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
} from '@chakra-ui/react';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';

import Pagination from '@client/components/shared/Pagination';
import StationFormModal from '@client/components/admin/stationsPage/StationFormModal';
import Loader from '@client/components/shared/Loader';

import {
  useCreateStation,
  useUpdateStation,
  useDeleteStation,
} from '@client/hooks/requests/stations';
import { useAdminStore } from '@client/stores/AdminStore';

import { IStation } from '@shared/types/assets.types';

const PAGE_SIZE = 5;

interface IProps {}

const StationsList: FC<IProps> = ({}) => {
  const [page, setPage] = useState(0);
  const [isNewStationModalOpen, setIsNewStationModalOpen] = useState(false);
  const [isEditStationModalOpen, setIsEditStationModalOpen] = useState(false);
  const [stationToEdit, setStationToEdit] = useState<IStation | undefined>();

  const loading = useAdminStore((state) => state.loading);
  const stations = useAdminStore((state) => state.stations);

  const currentStations = useMemo(
    () => stations.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [page, stations]
  );

  const { mutate: createStation } = useCreateStation();
  const { mutate: updateStation } = useUpdateStation();
  const { mutate: deleteStation } = useDeleteStation();

  if (loading) return <Loader size="100px" />;

  if (!stations) return <Heading>There are no stations</Heading>;

  return (
    <Container>
      <Heading fontWeight="600" as="h2" fontSize="1.25rem" mb="1rem">
        Stations
      </Heading>
      <Flex flexDir="column" gap="1rem">
        <TableContainer border="1px solid #E2E8F0" borderRadius="lg">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Bikes Assigned</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentStations.map((station) => {
                const bikesCount = station.bikes.length;
                const color = bikesCount > 0 ? 'green' : 'red';
                return (
                  <Tr key={station.id}>
                    <Td>{station.title}</Td>
                    <Td color={color}>{bikesCount}</Td>
                    <Td display="flex" gap="0.5rem">
                      <Button
                        size="sm"
                        variant="outline"
                        colorScheme="messenger"
                        gap="0.4rem"
                        p="0.5rem"
                        onClick={() => {
                          setIsEditStationModalOpen(true);
                          setStationToEdit(station);
                        }}
                      >
                        <MdModeEdit size="1.75rem" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        colorScheme="red"
                        gap="0.4rem"
                        p="0.5rem"
                        onClick={() => {
                          deleteStation(station.id);
                        }}
                      >
                        <MdDelete size="1.75rem" />
                        Remove
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
          <Heading fontWeight="600" as="h3" fontSize="1rem" p="1rem">
            Total stations:
            <Text ml="1rem" color="primary" as="span">
              {stations.length}
            </Text>
          </Heading>
        </TableContainer>
        <Flex justifyContent="space-between">
          <Pagination
            list={stations}
            setPage={setPage}
            page={page}
            pageSize={PAGE_SIZE}
          />

          <Button
            variant="outline"
            colorScheme="whatsapp"
            gap="0.5rem"
            onClick={() => setIsNewStationModalOpen(true)}
          >
            <AiOutlinePlus size="1.75rem" />
            Add Station
          </Button>
        </Flex>
      </Flex>

      <StationFormModal
        title="Add New Station"
        ctaText="Create"
        isOpen={isNewStationModalOpen}
        onClose={(station?: IStation) => {
          setIsNewStationModalOpen(false);
          station && createStation(station);
        }}
      />
      <StationFormModal
        title="Edit Station"
        ctaText="Edit"
        isOpen={isEditStationModalOpen}
        onClose={(station?: IStation) => {
          setIsEditStationModalOpen(false);
          setStationToEdit(undefined);
          station && updateStation(station);
        }}
        station={stationToEdit}
      />
    </Container>
  );
};

export default memo(StationsList);
