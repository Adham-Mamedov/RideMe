import { FC, memo } from 'react';
import Image from 'next/image';
import {
  Box,
  Container,
  ContainerProps,
  Heading,
  Text,
} from '@chakra-ui/react';

const Motivation: FC = () => {
  return (
    <Container {...containerStyles}>
      <Box maxW={'570px'} order={[1, null, 0]}>
        <Heading
          fontSize={['1.5rem', '2rem', '3rem', '4rem']}
          as={'h2'}
          fontWeight={700}
        >
          Dare to live the life you&apos;ve always wanted.
        </Heading>
        <Text fontSize={['1rem', 'xl', '2xl']} color="textGray">
          Start healthy lifestyle today
        </Text>
      </Box>
      <Box {...imageWrapperStyles}>
        <Image
          width={450}
          height={600}
          src={'/images/motivation.jpg'}
          alt={'cyclist with mountain in the background'}
        />
      </Box>
    </Container>
  );
};

// styles
const containerStyles: ContainerProps = {
  display: 'flex',
  flexDir: ['column', null, 'row'],
  alignItems: ['center', null, 'center'],
  justifyContent: ['center', null, 'space-between'],
  gap: '1rem',
};

const imageWrapperStyles = {
  overflow: 'hidden',
  maxH: '585px',
  maxW: '430px',
  borderRadius: '233px 233px 0 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  order: [0, null, 1],
};

export default memo(Motivation);
