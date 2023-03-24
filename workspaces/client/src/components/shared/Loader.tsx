import { FC } from 'react';
import { Box } from '@chakra-ui/react';

interface IProps {
  size?: string;
}

const Loader: FC<IProps> = ({ size }) => {
  return <Box className="lds-dual-ring" _after={{ w: size, h: size }} />;
};

export default Loader;
