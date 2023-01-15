import { NextPage } from 'next';
import { Box, Button, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { useAuthAxios } from '@client/hooks/useAuthAxios';
import { EReactQueryKeys, ERoute, Role } from '@shared/enums';
import { useAuthStore } from '@client/stores/AuthStore';

const TestPage: NextPage = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const axios = useAuthAxios();
  const { refetch: logout } = useQuery(
    EReactQueryKeys.logout,
    () => axios.post(`${ERoute.Auth}/logout`),
    {
      enabled: false,
      onError(error) {
        console.log(error);
      },
      onSuccess() {
        router.push('/');
      },
    }
  );
  const { data } = useQuery(
    EReactQueryKeys.users,
    () => axios.get(ERoute.User),
    {
      onError(error) {
        console.log(error);
      },
    }
  );

  if (user?.role !== Role.Admin) {
    return <div>Loading</div>;
  }

  return (
    <Box p={6}>
      <Heading>Test Page</Heading>
      <Button onClick={() => logout()}>Log out</Button>
    </Box>
  );
};

export { getAuthServerSideProps as getServerSideProps } from '@client/utils/getAuthServerSideProps';

export default TestPage;
