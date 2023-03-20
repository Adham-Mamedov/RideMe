import { NextPage } from 'next';
import { Button, Flex, Heading } from '@chakra-ui/react';
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
    () => axios.get(ERoute.Users),
    {
      onError(error) {
        console.log(error);
      },
    }
  );

  if (!user || user.role === Role.User) {
    return <div>Loading</div>;
  }

  return (
    <Flex flexDir={'column'} gap={'1rem'} p={6}>
      <Heading>
        Test Page{' '}
        <Button w={'fit-content'} onClick={() => logout()}>
          Log out
        </Button>
      </Heading>

      <Heading size={'md'}>Users:</Heading>
      <ol>
        {data?.data?.map((user: any) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ol>
    </Flex>
  );
};

export { getAuthServerSideProps as getServerSideProps } from '@client/utils/getAuthServerSideProps';

export default TestPage;
