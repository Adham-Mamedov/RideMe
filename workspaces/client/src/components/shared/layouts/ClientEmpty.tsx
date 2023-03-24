import { FC, memo, ReactNode } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

interface IProps {
  children: ReactNode;
  props?: FlexProps;
}

const ClientEmpty: FC<IProps> = ({ children, props }) => {
  return (
    <Flex bg={'#F9F9F9'} flexDir="column" {...props}>
      {children}
    </Flex>
  );
};

export default memo(ClientEmpty);
