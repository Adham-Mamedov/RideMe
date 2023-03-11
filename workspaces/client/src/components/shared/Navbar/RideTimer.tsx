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

interface IProps {}

const RideTimer: FC<IProps> = () => {
  const activeRide = useGlobalStore((state) => state.activeRide);
  const [stopwatchTime, setStopwatchTime] = useState<string>('00:00:00');

  const getStopwatchTime = useCallback(() => {
    if (!activeRide) return '00:00:00';
    const maxRideTime = 1000 * 60 * 60 * 24; // 1 day

    const { timeStart } = activeRide;
    const now = new Date().getTime();
    const diff = now - timeStart.getTime();

    if (diff > maxRideTime) {
      // TODO: stop ride
      return '00:00:00';
    }

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [activeRide]);

  const finishRide = useCallback(() => {
    // TODO: finish ride
    console.log(activeRide);
  }, [activeRide]);

  useEffect(() => {
    const interval = setInterval(() => setStopwatchTime(getStopwatchTime()));

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
          <Button colorScheme="red" onClick={finishRide}>
            Finish
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default memo(RideTimer);
