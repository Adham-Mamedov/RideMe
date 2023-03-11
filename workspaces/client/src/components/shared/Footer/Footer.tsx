import { FC, memo } from 'react';
import {
  Card,
  CardProps,
  Container,
  ContainerProps,
  Heading,
  Text,
} from '@chakra-ui/react';

const Footer: FC = () => {
  return (
    <Card {...wrapperCardStyles}>
      <Container {...containerStyles}>
        <Heading
          as={'h1'}
          fontSize={['1.25rem', null, '1.5rem']}
          fontWeight="900"
        >
          RideME
        </Heading>
        <Text>
          Project is held under Westminster International University in Tashkent
          © Adkham Mamedov
        </Text>
      </Container>
    </Card>
  );
};

// styles
const wrapperCardStyles: CardProps = {
  w: '100%',
  minH: ['50px', '200px'],
  borderRadius: '0',
  bg: '#fff',
  display: 'flex',
  justify: 'center',
};

const containerStyles: ContainerProps = {
  p: '8px 8px',
  display: 'flex',
  flexDir: 'column',
  gap: ['0.5rem', '1rem'],
  justifyContent: 'center',
};

export default memo(Footer);
