import type { AppProps } from 'next/app';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import AuthProvider from '@client/components/shared/AuthProvider';
import Link from 'next/link';
import HTMLHead from '@client/components/shared/HTMLHead';

import '@client/assets/styles/global.scss';
import { useAuthStore } from '@client/stores/AuthStore';

interface NextAppProps extends AppProps<{ dehydratedState: DehydratedState }> {}

const Page = (props: NextAppProps) => {
  const { Component, pageProps } = props;
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <Link href={'/'}>Home</Link>
      <Link href={'/login'}>Login</Link>
      <Link href={'/test'}>Test</Link>
      {user && (
        <Flex gap={'1rem'}>
          <p>Logged in as: {user.name}</p>
          <b>Role: {user.role}</b>
        </Flex>
      )}
      <Component {...pageProps} />
    </>
  );
};

const NextApp = (props: NextAppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={props.pageProps.dehydratedState}>
        <ChakraProvider>
          <HTMLHead />
          <AuthProvider>
            <Page {...props} />
          </AuthProvider>
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default NextApp;
