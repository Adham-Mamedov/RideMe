import { FC, memo, ReactNode } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

import GlobalProvider from '@client/components/shared/providers/GlobalProvider';
import NavBar from '@client/components/shared/Navbar/NavBar';

interface IProps {
  children: ReactNode;
  props?: FlexProps;
}

const ClientPrimary: FC<IProps> = ({ children, props }) => {
  return (
    <GlobalProvider>
      <Flex flexDir={'column'} {...props}>
        <NavBar />
        {children}
      </Flex>
    </GlobalProvider>
  );
};

export default memo(ClientPrimary);
