import {
  ChangeEvent,
  FC,
  memo,
  MouseEvent,
  useCallback,
  useState,
} from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from '@chakra-ui/react';

import Loader from '@client/components/shared/Loader';

import {
  cardNumberValidator,
  expDateValidator,
} from '@shared/utils/string.utils';

import { IRegisterUser } from '@shared/types/auth.types';

interface IProps {
  formData: IRegisterUser;
  updateFormData: (
    event: ChangeEvent<HTMLInputElement>,
    key: string,
    subKey?: string
  ) => void;
  loading: boolean;
  submitHandler: (e: any) => void;
  backHandler: (e: MouseEvent<HTMLButtonElement>, value: number) => void;
}

const CardDetailsForm: FC<IProps> = ({
  formData,
  updateFormData,
  loading,
  submitHandler,
  backHandler,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback(() => {
    const errors: Record<string, string> = {};

    if (!cardNumberValidator(formData.card.number)) {
      errors['number'] = 'Please enter a valid card number';
    }
    if (!expDateValidator(formData.card.expDate)) {
      errors['expDate'] = 'Please enter a valid exp date';
    }

    setErrors(errors);
    return !Object.keys(errors).length;
  }, [formData]);

  const onSubmit = (e: any) => {
    if (validate()) {
      submitHandler(e);
    } else {
      e.preventDefault();
    }
  };

  return (
    <Flex
      as="form"
      flexDir="column"
      alignItems="center"
      gap={['1rem', '1.5rem']}
      onSubmit={onSubmit}
    >
      <Heading fontSize="18px">Add Card</Heading>
      <FormControl isRequired isInvalid={!!errors['number']}>
        <FormLabel fontWeight={400}>Card Number</FormLabel>
        <Input
          placeholder="1111222233334444"
          value={formData.card.number}
          onChange={(event) => updateFormData(event, 'card', 'number')}
          type="text"
          name="card"
        />
        <FormErrorMessage>{errors['number']}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors['expDate']}>
        <FormLabel fontWeight={400}>Exp Date</FormLabel>
        <Input
          placeholder="MM/YY"
          value={formData.card.expDate}
          onChange={(event) => updateFormData(event, 'card', 'expDate')}
          type="text"
          name="expDate"
        />
        <FormErrorMessage>{errors['expDate']}</FormErrorMessage>
      </FormControl>

      <Button variant="primary" type={'submit'} w="100%" disabled={loading}>
        {loading ? <Loader size="32px" /> : 'Register'}
      </Button>
      <Button
        type={'button'}
        w="100%"
        disabled={loading}
        onClick={(e) => backHandler(e, 1)}
      >
        Back
      </Button>
      <Text>
        Already have account?{' '}
        <Link href={'/login'} color="primary">
          Log in
        </Link>
      </Text>
    </Flex>
  );
};

export default memo(CardDetailsForm);
