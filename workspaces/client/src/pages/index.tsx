import { NextPage } from 'next';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { useGlobalStore } from '../stores/GlobalStore';

const IndexPage: NextPage = () => {
  const loading = useGlobalStore((store) => store.loading);
  const setLoading = useGlobalStore((store) => store.setLoading);

  return (
    <Box p={6}>
      <Heading>Hello world!</Heading>
      <Text>{loading ? 'loading' : 'Not Loading.'}</Text>
      <Button onClick={() => setLoading(!loading)}>Switch Loading</Button>
    </Box>
  );
};

export default IndexPage;
