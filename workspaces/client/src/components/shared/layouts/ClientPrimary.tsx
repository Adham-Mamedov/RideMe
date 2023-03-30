import { FC, memo, ReactNode } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

import { useAuthStore } from '@client/stores/AuthStore';

import GlobalProvider from '@client/components/shared/providers/GlobalProvider';
import NavBar from '@client/components/shared/Navbar/NavBar';

interface IProps {
  children: ReactNode;
  authRequired?: boolean;
  props?: FlexProps;
}

const ClientPrimary: FC<IProps> = ({ children, props, authRequired }) => {
  const user = useAuthStore((state) => state.user);

  if (user && authRequired) {
    return (
      <GlobalProvider>
        <Flex flexDir={'column'} {...props}>
          <NavBar />
          {children}
        </Flex>
      </GlobalProvider>
    );
  }

  return (
    <Flex flexDir={'column'} {...props}>
      <NavBar />
      {children}
    </Flex>
  );
};

export default memo(ClientPrimary);
