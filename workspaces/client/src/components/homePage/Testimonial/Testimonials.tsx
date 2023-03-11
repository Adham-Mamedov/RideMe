import { FC, memo } from 'react';
import Image from 'next/image';
import {
  Box,
  Card,
  CardBody,
  Container,
  ContainerProps,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { AiFillStar } from 'react-icons/ai';

import QuoteBadge from '@client/components/homePage/Testimonial/QuoteBadge';

const Testimonials: FC = () => {
  return (
    <Container {...containerStyles}>
      <Box maxW={'590px'} textAlign="center">
        <Heading
          as="h3"
          fontSize="1rem"
          textTransform="uppercase"
          color="primary"
        >
          Testimonial
        </Heading>
        <Heading fontSize={['1.5rem', '2rem', '3rem']} as="h2" fontWeight={700}>
          Satisfied travelers around the world
        </Heading>
      </Box>

      <Flex gap={['1.5rem', null, '2rem']} flexWrap="wrap" justify="center">
        {testimonials.map(({ name, image, position, text, stars }) => {
          const reviews = new Array(stars)
            .fill('')
            .map((_, index) => (
              <AiFillStar
                fill="#FFBD39"
                width="12px"
                height="12px"
                key={index}
              />
            ));
          return (
            <Card
              key={name}
              h={['350px']}
              w={['300px']}
              position="relative"
              padding={['1rem 0.5rem', '1.5rem 1rem', '2.5rem 2rem']}
              fontSize="14px"
              borderRadius="1rem"
            >
              <CardBody
                display="flex"
                flexDir="column"
                gap={'1rem'}
                alignItems="center"
                textAlign="center"
              >
                <QuoteBadge />
                <Image
                  src={image}
                  alt={name}
                  width={150}
                  height={150}
                  style={{
                    borderRadius: '50%',
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                  }}
                />
                <Box>
                  <Heading fontSize="1.25rem" as="h5">
                    {name}
                  </Heading>
                  <Text>{position}</Text>
                  <Flex justify="center">{reviews}</Flex>
                </Box>
                <Text>{text}</Text>
              </CardBody>
            </Card>
          );
        })}
      </Flex>
    </Container>
  );
};

const testimonials: {
  name: string;
  image: string;
  position: string;
  text: string;
  stars: number;
}[] = [
  {
    name: 'Eleanor Pena',
    image: '/images/testimonial_1.jpg',
    position: 'UI/UX Designer',
    text: 'The bikes are always in good condition, and the stations are conveniently located throughout the city.',
    stars: 5,
  },
  {
    name: 'Maya Smith',
    image: '/images/testimonial_2.jpg',
    position: 'Vlogger',
    text: "I absolutely love the shared bicycle system! It's a great way to get around the city quickly and easily.",
    stars: 5,
  },
  {
    name: 'Andrew Adams',
    image: '/images/testimonial_3.jpg',
    position: 'Doctor',
    text: 'It made my daily commute so much easier. I no longer have to deal with crowded buses or long walks to the office.',
    stars: 5,
  },
];

// styles
const containerStyles: ContainerProps = {
  display: 'flex',
  flexDir: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: ['1rem', '3rem', '5rem'],
};
export default memo(Testimonials);
