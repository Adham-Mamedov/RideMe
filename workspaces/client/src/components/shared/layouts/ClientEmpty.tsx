import { FC, memo, ReactNode } from 'react';
import { Flex, FlexProps, Link } from '@chakra-ui/react';

interface IProps {
  children: ReactNode;
  props?: FlexProps;
}

const ClientEmpty: FC<IProps> = ({ children, props }) => {
  return (
    <Flex bg={'#F9F9F9'} flexDir="column" {...props}>
      <Link
        href={'/'}
        fontSize={['1.25rem', '2rem']}
        textDecoration="none!important"
        color="primary"
        fontWeight={900}
      >
        RideME
      </Link>
      {children}
    </Flex>
  );
};

export default memo(ClientEmpty);
