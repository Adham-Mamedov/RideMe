import { FC, FormEvent, memo, useCallback, useMemo, useState } from 'react';
import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useGlobalStore } from '@client/stores/GlobalStore';
import { IComment } from '@shared/types/assets.types';

interface IProps {}

const PostRideModal: FC<IProps> = ({}) => {
  const activeRide = useGlobalStore((state) => state.activeRide);
  const showPostRideModal = useGlobalStore((state) => state.showPostRideModal);
  const setShowPostRideModal = useGlobalStore(
    (state) => state.setShowPostRideModal
  );

  const [comment, setComment] = useState<string>('');

  const distanceTraveled = useMemo<string>(() => {
    return activeRide?.distance.toFixed(2)!;
  }, [activeRide]);

  const timeTraveled = useMemo<string>(() => {
    const now = new Date().getTime();
    const difference = now - activeRide?.timeStart?.getTime()!;
    const minutes = Math.ceil((difference / 1000 / 60) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    return `${hours ? `${hours}h ` : ''}${minutes}min`;
  }, [activeRide]);

  const rideCost = useMemo<string>(() => {
    return Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'sum',
      maximumFractionDigits: 0,
    }).format(activeRide?.cost!);
  }, [activeRide]);

  const onClose = () => {
    if (!comment.trim()) {
      const commentOnRide: IComment = {
        text: comment,
        createdAt: new Date(),
        rideId: activeRide?.id!,
      };
      // TODO: save comment to db
    }
    setShowPostRideModal(false);
  };

  const handleCommentInput = useCallback(
    (e: FormEvent<HTMLTextAreaElement>) => {
      setComment(e.currentTarget.value);
    },
    []
  );

  return (
    <Modal isOpen={showPostRideModal} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="1.5rem">Thank You!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading as="h3" fontSize="18px">
            Ride details:
          </Heading>
          <Flex as="p" gap="0.5rem">
            Distance traveled:
            <Text as="span" fontWeight="600" color="success">
              {distanceTraveled}km
            </Text>
          </Flex>
          <Flex as="p" gap="0.5rem">
            Time traveled:
            <Text as="span" fontWeight="600" color="success">
              {timeTraveled}
            </Text>
          </Flex>
          <Flex as="p" gap="0.5rem">
            Ride cost:
            <Text as="span" fontWeight="600" color="critical">
              {rideCost}
            </Text>
          </Flex>

          <Flex flexDir="column" gap="0.5rem" mt="1rem">
            <Text>Comments on bike:</Text>
            <Textarea
              placeholder="My back wheel is broken:("
              minH="120px"
              maxH="400px"
              value={comment}
              onInput={handleCommentInput}
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(PostRideModal);
