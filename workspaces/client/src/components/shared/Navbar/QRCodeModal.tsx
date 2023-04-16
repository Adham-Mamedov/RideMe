import { FC, memo } from 'react';
import Image from 'next/image';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const QRCodeModal: FC<IProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="1.5rem">Let machine scan QR Code</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" justifyContent="center">
          <Image
            width="300"
            height="300"
            src={'/images/qr_code.png'}
            alt="QR Code"
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Scanned
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(QRCodeModal);
