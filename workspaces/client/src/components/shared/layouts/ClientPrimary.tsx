import { FC, memo, ReactNode } from 'react';
import NavBar from '@client/components/shared/Navbar/NavBar';
import { Flex } from '@chakra-ui/react';

interface IProps {
  children: ReactNode;
}

const ClientPrimary: FC<IProps> = ({ children }) => {
  return (
    <Flex flexDir={'column'} gap={['2rem', null, '5rem']}>
      <NavBar />
      {children}
    </Flex>
  );
};

export default memo(ClientPrimary);
