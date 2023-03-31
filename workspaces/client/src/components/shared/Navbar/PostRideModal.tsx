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
import useCreateComment from '@client/hooks/requests/comments/useCreateComment';

import { CreateCommentDto } from '@server/modules/comment/dto/comment.dto';

interface IProps {}

const PostRideModal: FC<IProps> = ({}) => {
  const [comment, setComment] = useState<string>('');

  const postRide = useGlobalStore((state) => state.postRide);
  const setPostRide = useGlobalStore((state) => state.setPostRide);

  const { mutate: createComment, isLoading } = useCreateComment();

  const distanceTraveled = useMemo<string>(() => {
    return postRide?.distance?.toFixed(2)!;
  }, [postRide]);

  const timeTraveled = useMemo<string>(() => {
    const now = new Date().getTime();
    const difference = now - postRide?.timeStart?.getTime()!;
    const minutes = Math.ceil((difference / 1000 / 60) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    return `${hours ? `${hours}h ` : ''}${minutes}min`;
  }, [postRide]);

  const rideCost = useMemo<string>(() => {
    return Intl.NumberFormat('uz-UZ', {
      style: 'currency',
      currency: 'UZS',
      maximumFractionDigits: 0,
    }).format(postRide?.cost!);
  }, [postRide]);

  const onClose = () => {
    if (comment.trim()) {
      const commentOnRide: CreateCommentDto = {
        text: comment,
        rideId: postRide?.id!,
      };
      createComment(commentOnRide);
    }
    setPostRide(null);
  };

  const handleCommentInput = useCallback(
    (e: FormEvent<HTMLTextAreaElement>) => {
      setComment(e.currentTarget.value);
    },
    []
  );

  return (
    <Modal isOpen={!!postRide} onClose={onClose} isCentered>
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
          <Button
            colorScheme="blue"
            mr={3}
            onClick={onClose}
            disabled={isLoading}
          >
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(PostRideModal);
