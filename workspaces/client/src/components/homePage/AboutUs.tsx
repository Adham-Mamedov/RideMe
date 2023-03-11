import { FC, memo } from 'react';
import Image from 'next/image';
import {
  Box,
  BoxProps,
  Container,
  ContainerProps,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from '@chakra-ui/react';
import { aboutUsStatistics } from '@client/utils/defaults';

const AboutUs: FC = () => {
  return (
    <Container {...containerStyles}>
      <Box {...imagesWrapperStyles}>
        <Box {...backgroundImageStyles}>
          <Image
            width={400}
            height={600}
            src="/images/about_us_bg.jpg"
            alt="twilight city"
            style={{ height: '555px' }}
          />
        </Box>
        <Box {...foregroundImageStyles}>
          <Image
            width={300}
            height={450}
            src="/images/about_us_front.jpg"
            alt="bicycle on a bridge over a river"
          />
        </Box>
      </Box>

      <Flex flexDir="column" gap={['1rem', null, '1.5rem']} maxW="480px">
        <Box>
          <Heading
            as="h3"
            fontSize="1rem"
            textTransform="uppercase"
            textAlign={['center', null, 'left']}
            color="primary"
          >
            About us
          </Heading>
          <Heading
            fontSize={['1.5rem', '2rem', '3rem']}
            as="h2"
            fontWeight={700}
          >
            We care!
          </Heading>
        </Box>
        <Text fontSize={['1rem', '1.25rem']} color="textGray">
          How many of you have wasted time staying on traffic jams? Now you can
          avoid them in a healthy way. Choose the right Bike!
        </Text>
        <Grid
          gridTemplateColumns={[
            'repeat(2, 1fr)',
            'repeat(4, 1fr)',
            'repeat(2, 1fr)',
            'repeat(4, 100px)',
          ]}
          gap={['0.5rem', null, null, 0]}
          justifyContent="space-between"
        >
          {aboutUsStatistics.map(({ value, description }) => (
            <GridItem key={description}>
              <Heading
                color="primary"
                dangerouslySetInnerHTML={{ __html: value }}
              />
              <Text
                color="textGray"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Container>
  );
};

// styles
const containerStyles: ContainerProps = {
  display: 'flex',
  flexDir: ['column', null, 'row'],
  alignItems: ['center', null, 'center'],
  justifyContent: ['center', null, 'space-between'],
  gap: ['7rem', null, '12rem'],
  minH: ['auto', '660px'],
  paddingBottom: ['1rem', null, '100px'],
};

const imagesWrapperStyles: BoxProps = {
  maxH: '660px',
  display: 'flex',
  position: 'relative',
  flexShrink: 0,
  transform: ['translateX(-15%)', null, 'auto'],
};

const backgroundImageStyles: BoxProps = {
  overflow: 'hidden',
  borderRadius: '233px',
  maxW: ['250px', '300px', '360px'],
  maxH: ['450px', null, '555px'],
};

const foregroundImageStyles: BoxProps = {
  position: 'absolute',
  bottom: '-20%',
  right: ['-30%', null, '-50%'],
  overflow: 'hidden',
  borderRadius: '233px',
  maxW: ['200px', null, '280px'],
  maxH: ['300px', null, '410px'],
  border: '12px solid #fff',
};

export default memo(AboutUs);
