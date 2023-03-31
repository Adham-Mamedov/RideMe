import { FC, memo, useCallback, useEffect, useState } from 'react';
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';

import { useGlobalStore } from '@client/stores/GlobalStore';
import useUpdateRide from '@client/hooks/requests/rides/useUpdateRide';

import { pickRandomFromArray } from '@shared/utils/object.utils';
import { EditRideDto } from '@server/modules/ride/dto/ride.dto';

interface IProps {}

const RideTimer: FC<IProps> = () => {
  const [stopwatchTime, setStopwatchTime] = useState<string>('00:00:00');

  const stations = useGlobalStore((state) => state.stations);
  const activeRide = useGlobalStore((state) => state.activeRide);

  const { mutate: updateRide, isLoading } = useUpdateRide();

  const finishRide = useCallback(() => {
    const randomStation = pickRandomFromArray(
      stations.filter((s) => s.id !== activeRide?.stationFromId)
    );

    const ride: EditRideDto = {
      id: activeRide?.id!,
      stationToId: randomStation.id!,
      distance: +(Math.random() * 5).toFixed(2),
    };
    updateRide(ride);
  }, [activeRide, stations, updateRide]);

  const getStopwatchTime = useCallback(() => {
    if (!activeRide) return '00:00:00';
    const maxRideTime = 1000 * 60 * 60 * 24; // 1 day

    const { timeStart } = activeRide;
    const now = new Date().getTime();
    const diff = now - timeStart.getTime();

    if (diff > maxRideTime) {
      finishRide();
      return '00:00:00';
    }

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [activeRide, finishRide]);

  useEffect(() => {
    setStopwatchTime(getStopwatchTime());
    const interval = setInterval(
      () => setStopwatchTime(getStopwatchTime()),
      1000
    );

    return () => clearInterval(interval);
  }, [getStopwatchTime]);

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          px={['1rem', null, '1.5rem']}
          py={['0.5rem', null, '1rem']}
          h={['44px', null, '60px']}
          fontSize={['1rem', null, '1.25rem']}
          borderRadius="45px"
          variant="primary"
        >
          {stopwatchTime}
        </Button>
      </PopoverTrigger>
      <PopoverContent w={'fit-content'}>
        <PopoverArrow />
        <PopoverBody
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={['4px', '8px']}
          fontWeight="700"
        >
          Finish current ride?
          <Button colorScheme="red" onClick={finishRide} disabled={isLoading}>
            Finish
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default memo(RideTimer);
