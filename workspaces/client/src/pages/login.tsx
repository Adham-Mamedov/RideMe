import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useState } from 'react';
import {
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from '@chakra-ui/react';

import { useAxios } from '@client/hooks/useAxios';

import { SuccessEntity } from '@server/common/entities/common.entities';
import ClientEmpty from '@client/components/shared/layouts/ClientEmpty';
import Loader from '@client/components/shared/Loader';

const LoginPage: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    password: '',
    email: '',
  });

  const router = useRouter();
  const axios = useAxios();

  const updateFormData = useCallback(
    (event: ChangeEvent<HTMLInputElement>, key: string) => {
      setFormData((prevState) => ({
        ...prevState,
        [key]: event.target.value,
      }));
    },
    []
  );

  const submitHandler = useCallback(
    async (e: any) => {
      try {
        setLoading(true);
        e.preventDefault();
        await axios.post<SuccessEntity>('/auth/login', formData);
        await router.push((router.query.back || '/') as string);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    [axios, formData, router]
  );

  return (
    <ClientEmpty
      props={{
        justifyContent: 'center',
        alignItems: 'center',
        minH: '100vh',
        gap: ['1rem', null, '1.5rem'],
        p: '1rem',
      }}
    >
      <Heading fontWeight={400} fontSize="1.5rem">
        Login
      </Heading>
      <Card shadow={0} p={['1rem', '1.5rem']} w={['100%', '360px']}>
        <Flex
          as="form"
          flexDir="column"
          alignItems="center"
          gap={['1rem', '1.5rem']}
          onSubmit={submitHandler}
        >
          <FormControl isRequired>
            <FormLabel fontWeight={400}>Email</FormLabel>
            <Input
              value={formData.email}
              onChange={(event) => updateFormData(event, 'email')}
              type="email"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontWeight={400}>Password</FormLabel>
            <Input
              value={formData.password}
              onChange={(event) => updateFormData(event, 'password')}
              type="password"
            />
          </FormControl>
          <Button variant="primary" type={'submit'} w="100%" disabled={loading}>
            {loading ? <Loader size="32px" /> : 'Login'}
          </Button>
          <Text>
            Don&apos;t have account?{' '}
            <Link href={'/register'} color="primary">
              Create new account
            </Link>
          </Text>
        </Flex>
      </Card>
    </ClientEmpty>
  );
};

export default LoginPage;
