import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';

import { useGlobalStore } from '@client/stores/GlobalStore';
import { useAxios } from '@client/hooks/useAxios';

import { SuccessEntity } from '@server/common/entities/common.entities';

const LoginPage: NextPage = () => {
  const loading = useGlobalStore((store) => store.loading);
  const setLoading = useGlobalStore((store) => store.setLoading);

  const [formData, setFormData] = useState({
    password: '',
    email: '',
  });

  const router = useRouter();
  const axios = useAxios();

  const updateFormData = useCallback((event: any, key: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: event.target.value,
    }));
  }, []);

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
    [axios, formData, router, setLoading]
  );

  return (
    <Box p={6}>
      <Heading>Login Page</Heading>
      <form onSubmit={submitHandler}>
        <FormControl isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            value={formData.email}
            onChange={(event) => updateFormData(event, 'email')}
            type="email"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            value={formData.password}
            onChange={(event) => updateFormData(event, 'password')}
            type="password"
          />
        </FormControl>
        <Button type={'submit'} disabled={loading}>
          Log in
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
