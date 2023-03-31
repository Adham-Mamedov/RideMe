import { FC, memo } from 'react';
import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { useAuthStore } from '@client/stores/AuthStore';
import { BsCreditCard2Back } from 'react-icons/bs';

interface IProps {}

const UserProfile: FC<IProps> = ({}) => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <Container>
      <Flex direction="column" gap={['1.5rem', null, '2.5rem']}>
        <Flex
          gap={['1rem', null, '1.5rem']}
          justify="start"
          alignItems="center"
        >
          <Avatar
            w={['72px', '80px', '100px']}
            h={['72px', '80px', '100px']}
            bg="gray.400"
          />
          <Box>
            <Heading
              fontSize="1.25rem"
              fontWeight="500"
              dangerouslySetInnerHTML={{
                __html: user.name,
              }}
            />
            <Text color="textGray">{user.email}</Text>
          </Box>
        </Flex>
        <Flex direction="column" gap={['1rem', null, '1.5rem']}>
          <Heading fontSize="1.25rem"> Personal Information</Heading>
          <Flex gap={['1rem', '1.5rem', '40px']} flexWrap="wrap">
            <Flex direction="column" gap="1rem" w={['100%', null, 'auto']}>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                gap="0.5rem"
              >
                <Text>Name:</Text>
                <Input
                  readOnly
                  value={user.name}
                  bg="#EEEEEE"
                  w={['200px', '250px']}
                />
              </Flex>
              <Flex
                justifyContent="space-between"
                gap="0.5rem"
                alignItems="center"
              >
                <Text>Email:</Text>
                <Input
                  readOnly
                  value={user.email}
                  bg="#EEEEEE"
                  w={['200px', '250px']}
                />
              </Flex>
            </Flex>
            <Flex direction="column" gap="1rem" w={['100%', null, 'auto']}>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                gap="0.5rem"
              >
                <Text>Card Number:</Text>
                <InputGroup w={['200px', '250px']}>
                  <Input readOnly value={user.card.number} bg="#EEEEEE" />
                  <InputRightElement>
                    <BsCreditCard2Back color="#9EA8BD" />
                  </InputRightElement>
                </InputGroup>
              </Flex>
              <Flex
                justifyContent="space-between"
                gap="0.5rem"
                alignItems="center"
              >
                <Text>Exp Date:</Text>
                <Input
                  readOnly
                  value={user.card.expDate}
                  bg="#EEEEEE"
                  w={['200px', '250px']}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default memo(UserProfile);
