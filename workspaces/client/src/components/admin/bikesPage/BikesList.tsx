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
  Badge,
} from '@chakra-ui/react';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';

import Pagination from '@client/components/shared/Pagination';
import Loader from '@client/components/shared/Loader';

import {
  useCreateBike,
  useUpdateBike,
  useDeleteBike,
} from '@client/hooks/requests/bikes';
import { useAdminStore } from '@client/stores/AdminStore';

import { IBike } from '@shared/types/assets.types';
import BikeFormModal from '@client/components/admin/bikesPage/BikeFormModal';

const PAGE_SIZE = 5;

interface IProps {}

const BikesList: FC<IProps> = ({}) => {
  const [page, setPage] = useState(0);
  const [isNewBikeModalOpen, setIsNewBikeModalOpen] = useState(false);
  const [isEditBikeModalOpen, setIsEditBikeModalOpen] = useState(false);
  const [bikeToEdit, setBikeToEdit] = useState<IBike | undefined>();

  const loading = useAdminStore((state) => state.loading);
  const bikes = useAdminStore((state) => state.bikes);

  const currentBikes = useMemo(
    () => bikes.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [page, bikes]
  );

  const { mutateAsync: createBike } = useCreateBike();
  const { mutateAsync: updateBike } = useUpdateBike();
  const { mutateAsync: deleteBike } = useDeleteBike();

  if (loading) return <Loader size="100px" />;

  if (!bikes) return <Heading>There are no bikes</Heading>;

  return (
    <Container>
      <Heading fontWeight="600" as="h2" fontSize="1.25rem" mb="1rem">
        Bikes
      </Heading>
      <Flex flexDir="column" gap="1rem">
        <TableContainer border="1px solid #E2E8F0" borderRadius="lg">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Trial Period (min)</Th>
                <Th>Price per Minute</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentBikes.map((bike) => {
                const minutesColor = bike.freeMinutes > 0 ? 'green' : 'red';
                const priceColor = bike.pricePerMinute > 0 ? 'green' : 'red';

                let status;
                if (bike.isBroken) {
                  status = <Badge colorScheme="red">Broken</Badge>;
                } else if (bike.isAvailable) {
                  status = <Badge colorScheme="green">Available</Badge>;
                } else {
                  // TODO: FINISH when rides are implemented
                  status = <Badge colorScheme="purple">In use</Badge>;
                }

                return (
                  <Tr key={bike.id}>
                    <Td textOverflow="ellipsis" overflow="hidden" maxW="350px">
                      {bike.title}
                    </Td>
                    <Td color={minutesColor}>{bike.freeMinutes}</Td>
                    <Td color={priceColor}>{bike.pricePerMinute}</Td>
                    <Td>{status}</Td>
                    <Td display="flex" gap="0.5rem">
                      <Button
                        size="sm"
                        variant="outline"
                        colorScheme="messenger"
                        gap="0.4rem"
                        p="0.5rem"
                        onClick={() => {
                          setIsEditBikeModalOpen(true);
                          setBikeToEdit(bike);
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
                          deleteBike(bike.id);
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
            Total number of bikes:
            <Text ml="1rem" color="primary" as="span">
              {bikes.length}
            </Text>
          </Heading>
        </TableContainer>
        <Flex justifyContent="space-between">
          <Pagination
            list={bikes}
            setPage={setPage}
            page={page}
            pageSize={PAGE_SIZE}
          />

          <Button
            variant="outline"
            colorScheme="whatsapp"
            gap="0.5rem"
            onClick={() => setIsNewBikeModalOpen(true)}
          >
            <AiOutlinePlus size="1.75rem" />
            Add Bike
          </Button>
        </Flex>
      </Flex>

      <BikeFormModal
        title="Add New Bike"
        ctaText="Create"
        isOpen={isNewBikeModalOpen}
        onClose={async (bike?: IBike) => {
          try {
            bike && (await createBike(bike));
            setIsNewBikeModalOpen(false);
          } catch {}
        }}
      />
      <BikeFormModal
        title="Edit Bike"
        ctaText="Edit"
        isOpen={isEditBikeModalOpen}
        onClose={async (bike?: IBike) => {
          try {
            bike && (await updateBike(bike));
            setIsEditBikeModalOpen(false);
            setBikeToEdit(undefined);
          } catch {}
        }}
        bike={bikeToEdit}
      />
    </Container>
  );
};

export default memo(BikesList);
