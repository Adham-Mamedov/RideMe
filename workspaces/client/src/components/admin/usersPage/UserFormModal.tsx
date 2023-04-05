import {
  ChangeEvent,
  FC,
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';

import { IRegisterUser, IUser } from '@shared/types/auth.types';
import { defaultUserData } from '@client/utils/defaults';
import { Role } from '@shared/enums';
import {
  cardNumberValidator,
  emailValidator,
  expDateValidator,
} from '@shared/utils/string.utils';

interface IProps {
  title: string;
  ctaText: string;
  isOpen: boolean;
  onClose: (user?: IUser) => void;
  user?: IUser;
}

const UserFormModal: FC<IProps> = ({
  title,
  ctaText,
  isOpen,
  onClose,
  user,
}) => {
  const [initialCardNumber, setInitialCardNumber] = useState<string>(
    user?.card?.number || ''
  );
  const [userData, setUserData] = useState<IUser>(user || defaultUserData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setUserData(user || defaultUserData);
      setErrors({});
      setInitialCardNumber(user?.card?.number || '');
    }
  }, [user, isOpen]);

  const validate = useCallback(() => {
    const errors: Record<string, string> = {};

    if (!userData.name.trim()) {
      errors['name'] = 'Name is required';
    }
    if (!emailValidator(userData.email)) {
      errors['email'] = 'Enter a valid email';
    }

    if (
      initialCardNumber !== userData.card.number &&
      !cardNumberValidator(userData.card.number)
    ) {
      errors['number'] = 'Please enter a valid card number';
    }
    if (!expDateValidator(userData.card.expDate)) {
      errors['expDate'] = 'Please enter a valid exp date';
    }

    setErrors(errors);
    return !Object.keys(errors).length;
  }, [
    initialCardNumber,
    userData.card.expDate,
    userData.card.number,
    userData.email,
    userData.name,
  ]);

  const updateUserData = useCallback(
    (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      key: string,
      subKey?: string
    ) => {
      setUserData((prevState) => ({
        ...prevState,
        [key]: !subKey
          ? event.target.value
          : {
              ...(prevState[key as keyof IUser] as IRegisterUser['card']),
              [subKey]: event.target.value,
            },
      }));
    },
    []
  );

  const submitHandler = useCallback(
    (e: FormEvent<HTMLDivElement>) => {
      e.preventDefault();
      validate() && onClose(userData);
    },
    [onClose, userData, validate]
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
            id="user-form"
            flexDir="column"
            alignItems="center"
            gap={['1rem', '1.5rem']}
            onSubmit={submitHandler}
          >
            <FormControl isRequired>
              <FormLabel fontWeight={500}>User Name</FormLabel>
              <Input
                placeholder="User Name"
                value={userData.name}
                onChange={(event) => updateUserData(event, 'name')}
                type="text"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight={500}>User Email</FormLabel>
              <Input
                placeholder="User Email"
                value={userData.email}
                onChange={(event) => updateUserData(event, 'email')}
                type="text"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight={500}>User Role</FormLabel>
              <Select
                onChange={(event) => updateUserData(event, 'role')}
                value={userData.role}
              >
                {Object.values(Role).map((role) => {
                  return (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors['number']}>
              <FormLabel fontWeight={400}>Card Number</FormLabel>
              <Input
                placeholder="1111222233334444"
                value={userData.card.number}
                onChange={(event) => updateUserData(event, 'card', 'number')}
                type="text"
                name="card"
              />
              <FormErrorMessage>{errors['number']}</FormErrorMessage>
            </FormControl>
          </Flex>
          <FormControl isRequired isInvalid={!!errors['expDate']}>
            <FormLabel fontWeight={400}>Exp Date</FormLabel>
            <Input
              placeholder="MM/YY"
              value={userData.card.expDate}
              onChange={(event) => updateUserData(event, 'card', 'expDate')}
              type="text"
              name="expDate"
            />
            <FormErrorMessage>{errors['expDate']}</FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" variant="primary" form="user-form">
            {ctaText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(UserFormModal);
