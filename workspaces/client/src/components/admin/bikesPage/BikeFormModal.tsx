import { FC, FormEvent, memo, useCallback, useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
} from '@chakra-ui/react';

import { useAdminStore } from '@client/stores/AdminStore';

import { IBike } from '@shared/types/assets.types';
import { defaultBikeData } from '@client/utils/defaults';

interface IProps {
  title: string;
  ctaText: string;
  isOpen: boolean;
  onClose: (bike?: IBike) => void;
  bike?: IBike;
}

type TBikeValues = string | number | number[] | string[] | boolean;

const BikeFormModal: FC<IProps> = ({
  title,
  ctaText,
  isOpen,
  onClose,
  bike,
}) => {
  const [bikeData, setBikeData] = useState<IBike>(bike || defaultBikeData);

  const stations = useAdminStore((state) => state.stations);

  useEffect(() => {
    isOpen && setBikeData(bike || defaultBikeData);
  }, [bike, isOpen]);

  const updateBikeData = useCallback((value: TBikeValues, key: string) => {
    setBikeData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }, []);

  const submitHandler = useCallback(
    (e: FormEvent<HTMLDivElement>) => {
      e.preventDefault();
      bikeData.title.trim() && onClose(bikeData);
    },
    [onClose, bikeData]
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
            id="bike-form"
            flexDir="column"
            alignItems="center"
            gap="1rem"
            onSubmit={submitHandler}
          >
            <FormControl isRequired>
              <FormLabel fontWeight={500}>Bike Title</FormLabel>
              <Input
                placeholder="Bike title"
                value={bikeData.title}
                onChange={(event) =>
                  updateBikeData(event.currentTarget.value, 'title')
                }
                type="text"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight={500}>Bike description</FormLabel>
              <Textarea
                minH="150px"
                maxH="300px"
                placeholder="Some description for bike"
                value={bikeData.description}
                onChange={(event) =>
                  updateBikeData(event.currentTarget.value, 'description')
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight={500}>Bike image URL</FormLabel>
              <Input
                placeholder="https://example.com/image.png"
                value={bikeData.imageUrl}
                onChange={(event) =>
                  updateBikeData(event.currentTarget.value, 'imageUrl')
                }
                type="url"
              />
            </FormControl>
            <Flex gap="1rem" justify="start" w="100%">
              <FormControl isRequired maxW="150px">
                <FormLabel fontWeight={500}>Wheel size</FormLabel>
                <NumberInput
                  size="sm"
                  value={bikeData.wheelSize}
                  onChange={(value: string) =>
                    updateBikeData(+value, 'wheelSize')
                  }
                  min={0}
                  max={60}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl isRequired maxW="230px">
                <FormLabel fontWeight={500}>Recommended height (cm)</FormLabel>
                <NumberInput
                  size="sm"
                  value={bikeData.recommendedHeight}
                  onChange={(value: string) =>
                    updateBikeData(+value, 'recommendedHeight')
                  }
                  min={0}
                  max={250}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Flex>
            <Flex gap="1rem" justify="start" w="100%">
              <FormControl isRequired maxW="150px">
                <FormLabel fontWeight={500}>Price per Minute</FormLabel>
                <NumberInput
                  size="sm"
                  value={bikeData.pricePerMinute}
                  onChange={(value: string) =>
                    updateBikeData(+value, 'pricePerMinute')
                  }
                  min={0}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl isRequired maxW="230px">
                <FormLabel fontWeight={500}>Free period (minutes)</FormLabel>
                <NumberInput
                  size="sm"
                  value={bikeData.freeMinutes}
                  onChange={(value: string) =>
                    updateBikeData(+value, 'freeMinutes')
                  }
                  min={0}
                  max={1440}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Flex>
            {bike && (
              <Flex gap="1rem" justify="start" w="100%">
                <FormControl w="fit-content">
                  <Checkbox
                    defaultChecked={bikeData?.isAvailable}
                    onChange={(e) =>
                      updateBikeData(e.target.checked, 'isAvailable')
                    }
                  >
                    Is available
                  </Checkbox>
                </FormControl>
                <FormControl w="fit-content">
                  <Checkbox
                    defaultChecked={bikeData.isBroken}
                    onChange={(e) =>
                      updateBikeData(e.target.checked, 'isBroken')
                    }
                  >
                    Is broken
                  </Checkbox>
                </FormControl>
              </Flex>
            )}

            <FormControl>
              <FormLabel fontWeight={500}>Station</FormLabel>
              <Select
                onChange={(e) => {
                  updateBikeData(e.target.value, 'stationId');
                }}
                value={bikeData.stationId || ''}
                placeholder="Select station"
              >
                {stations.map((station) => (
                  <option key={station.id} value={station.id}>
                    {station.title}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" variant="primary" form="bike-form">
            {ctaText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(BikeFormModal);
