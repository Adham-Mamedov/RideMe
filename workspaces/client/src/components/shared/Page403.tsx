import { useRouter } from 'next/router';
import Link from 'next/link';
import { FC, memo, useEffect } from 'react';
import { Button, Flex, Heading } from '@chakra-ui/react';

import { useAuthStore } from '@client/stores/AuthStore';

const Page403: FC = () => {
  const setIsUnauthorized = useAuthStore((state) => state.setIsUnauthorized);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setIsUnauthorized(false);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, setIsUnauthorized]);

  return (
    <div className="page403">
      <div className="lock"></div>
      <Flex flexDir={'column'} alignItems={'center'} gap={'1rem'} mt={'2rem'}>
        <Heading size={'xl'}>Access to this page is restricted</Heading>
        <p>
          You do not have permission to access this page. Please contact your
          administrator.
        </p>
        <Link href={'/'}>
          <Button>Go Home</Button>
        </Link>
      </Flex>
    </div>
  );
};

export default memo(Page403);
