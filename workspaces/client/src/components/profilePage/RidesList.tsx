import { FC, memo, useMemo, useState } from 'react';
import {
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

import Pagination from '@client/components/shared/Pagination';
import Loader from '@client/components/shared/Loader';

import { useGlobalStore } from '@client/stores/GlobalStore';

const PAGE_SIZE = 5;

interface IProps {}

const RidesList: FC<IProps> = ({}) => {
  const [page, setPage] = useState(0);

  const loading = useGlobalStore((state) => state.loading);
  const rides = useGlobalStore((state) => state.rides);

  const currentRides = useMemo(
    () =>
      rides
        .filter((r) => r.timeEnd)
        .slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [page, rides]
  );

  const tableData = useMemo(
    () =>
      currentRides.map((ride) => {
        const date = new Date(ride.timeStart).toLocaleDateString('uz-UZ', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        });
        const timeStart = new Date(ride.timeStart).toLocaleTimeString('uz-UZ', {
          hour: 'numeric',
          minute: 'numeric',
        });
        const timeEnd = new Date(ride.timeEnd!).toLocaleTimeString('uz-UZ', {
          hour: 'numeric',
          minute: 'numeric',
        });
        const cost =
          ride.cost === 0
            ? 'FREE'
            : ride.cost.toLocaleString('uz', {
                style: 'currency',
                currency: 'sum',
                maximumFractionDigits: 0,
              });

        return (
          <Tr key={ride.id}>
            <Td textOverflow="ellipsis" overflow="hidden" maxW="350px">
              {date}
            </Td>
            <Td>{timeStart}</Td>
            <Td>{timeEnd}</Td>
            <Td>{ride.distance}km</Td>
            <Td>{cost}</Td>
          </Tr>
        );
      }),
    [currentRides]
  );

  if (loading) return <Loader size="100px" />;

  if (!rides) return <Heading>There are no rides yet</Heading>;

  return (
    <Container>
      <Heading as="h2" fontSize="1.25rem" mb="1rem">
        My Rides
      </Heading>
      <Flex flexDir="column" gap="1rem">
        <TableContainer border="1px solid #E2E8F0" borderRadius="lg">
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Time start</Th>
                <Th>Time end</Th>
                <Th>Distance</Th>
                <Th>Ride Cost</Th>
              </Tr>
            </Thead>
            <Tbody>{tableData}</Tbody>
          </Table>
          <Heading fontWeight="600" as="h3" fontSize="1rem" p="1rem">
            Total number of rides:
            <Text ml="1rem" color="primary" as="span">
              {rides.length}
            </Text>
          </Heading>
        </TableContainer>
        {rides.length > PAGE_SIZE ? (
          <Pagination
            list={rides}
            setPage={setPage}
            page={page}
            pageSize={PAGE_SIZE}
          />
        ) : (
          <div />
        )}
      </Flex>
    </Container>
  );
};

export default memo(RidesList);
