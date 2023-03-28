import { FC, memo, ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';
import NavBar from '@client/components/shared/Navbar/NavBar';
import AdminProvider from '@client/components/shared/providers/AdminProvider';

interface IProps {
  children: ReactNode;
}

const AdminPrimary: FC<IProps> = ({ children }) => {
  return (
    <Flex flexDir={'column'} gap={['2rem', null, '5rem']}>
      <AdminProvider />
      <NavBar />
      {children}
    </Flex>
  );
};

export default memo(AdminPrimary);
