import { FC, memo, ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

import NavBar from '@client/components/shared/Navbar/NavBar';
import AdminProvider from '@client/components/shared/providers/AdminProvider';
import PageLoader from '@client/components/shared/PageLoader';

import { useAuthStore } from '@client/stores/AuthStore';

interface IProps {
  children: ReactNode;
}

const AdminPrimary: FC<IProps> = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const setIsUnauthorized = useAuthStore((state) => state.setIsUnauthorized);

  if (!user) {
    return <PageLoader />;
  }
  if (user.role === 'User') {
    setIsUnauthorized(true);
  }

  return (
    <Flex flexDir={'column'} gap={['1rem', null, '3rem']}>
      <AdminProvider />
      <NavBar />
      {children}
    </Flex>
  );
};

export default memo(AdminPrimary);
