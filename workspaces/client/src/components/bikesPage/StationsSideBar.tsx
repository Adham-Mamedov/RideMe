import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from 'react';
import {
  Text,
  Card,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
} from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';

import { useGlobalStore } from '@client/stores/GlobalStore';

import { IStation } from '@shared/types/assets.types';

interface IProps {
  onClick: (station: IStation) => void;
  activeStation: IStation | null;
}

const StationsSideBar: FC<IProps> = ({ onClick, activeStation }) => {
  const [searchText, setSearchText] = useState<string>('');

  const stations = useGlobalStore((state) => state.stations);
  const bikes = useGlobalStore((state) => state.bikes);
  const filteredStations = useGlobalStore((state) => state.filteredStations);
  const setFilteredStations = useGlobalStore(
    (state) => state.setFilteredStations
  );
  const getBikesByStationId = useGlobalStore(
    (state) => state.getBikesByStationId
  );

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    setSearchText(text);
  }, []);

  useEffect(() => {
    setFilteredStations(
      stations.filter((station) =>
        station.title.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [setFilteredStations, searchText, stations, bikes]);

  return (
    <Flex
      display={['none', null, null, null, 'flex']}
      direction="column"
      gap="1rem"
      p="1.5rem 1rem"
      h="100%"
      minW="400px"
    >
      <FormControl>
        <InputGroup>
          <Input
            borderColor="textGray"
            placeholder="Search stations"
            value={searchText}
            onChange={handleSearch}
            type="text"
          />
          <InputRightElement>
            <AiOutlineSearch size="1.5rem" />
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Heading as="h3" fontSize={['1rem', null, '1.25rem']}>
        Results
      </Heading>
      <List display="flex" flexDir="column" gap="1rem">
        {filteredStations.length === 0 && (
          <Text color="textGray">No results found</Text>
        )}
        {filteredStations.map((station) => {
          const bikeCount = getBikesByStationId(station.id, true).length;
          const bikeColor = bikeCount > 0 ? 'success' : 'critical';
          return (
            <ListItem
              key={station.id}
              cursor="pointer"
              onClick={() => onClick(station)}
            >
              <Card
                p="10px"
                variant="outline"
                shadow="sm"
                borderRadius="0.5rem"
                borderColor={
                  activeStation?.id === station.id ? 'primary' : undefined
                }
              >
                <Text color="textGray">
                  Location:{' '}
                  <Text as="span" ml="0.5rem" color="textPrimary">
                    {station.title}
                  </Text>
                </Text>
                <Text color="textGray">
                  Bikes Available:{' '}
                  <Text as="span" ml="0.5rem" color={bikeColor}>
                    {bikeCount}
                  </Text>
                </Text>
              </Card>
            </ListItem>
          );
        })}
      </List>
    </Flex>
  );
};

export default memo(StationsSideBar);
