import { ChangeEvent, FC, memo, useCallback, useState } from 'react';
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

import { emailValidator } from '@shared/utils/string.utils';
import { IRegisterUser } from '@shared/types/auth.types';

interface IProps {
  formData: IRegisterUser;
  updateFormData: (event: ChangeEvent<HTMLInputElement>, key: string) => void;
  submitHandler: (e: any, value: number) => void;
}

const AccountDetailsForm: FC<IProps> = ({
  formData,
  updateFormData,
  submitHandler,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback(() => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors['name'] = 'Name is required';
    }
    if (!formData.password.trim()) {
      errors['password'] = 'Password is required';
    }
    if (!emailValidator(formData.email)) {
      errors['email'] = 'Enter a valid email';
    }

    setErrors(errors);
    return !Object.keys(errors).length;
  }, [formData]);

  const onSubmit = (e: any) => {
    if (validate()) {
      submitHandler(e, 2);
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
      <Heading fontSize="18px">Personal Information</Heading>
      <FormControl isRequired isInvalid={!!errors['name']}>
        <FormLabel fontWeight={400}>Name</FormLabel>
        <Input
          value={formData.name}
          onChange={(event) => updateFormData(event, 'name')}
          type="text"
          name="name"
          maxLength={50}
        />
        <FormErrorMessage>{errors['name']}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors['email']}>
        <FormLabel fontWeight={400}>Email</FormLabel>
        <Input
          value={formData.email}
          onChange={(event) => updateFormData(event, 'email')}
          type="email"
          name="email"
          maxLength={50}
        />
        <FormErrorMessage>{errors['email']}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors['password']}>
        <FormLabel fontWeight={400}>Password</FormLabel>
        <Input
          value={formData.password}
          onChange={(event) => updateFormData(event, 'password')}
          type="password"
          name="password"
          maxLength={50}
          minLength={6}
        />
        <FormErrorMessage>{errors['password']}</FormErrorMessage>
      </FormControl>
      <Button variant="primary" type={'submit'} w="100%">
        Next
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

export default memo(AccountDetailsForm);
