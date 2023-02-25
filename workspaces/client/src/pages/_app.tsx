import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useState } from 'react';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import AuthProvider from '@client/components/shared/AuthProvider';
import HTMLHead from '@client/components/shared/HTMLHead';

import { customTheme } from '@client/utils/chakra-theme';
import { useAuthStore } from '@client/stores/AuthStore';

import '@client/assets/styles/global.scss';

interface NextAppProps extends AppProps<{ dehydratedState: DehydratedState }> {}

const Page = (props: NextAppProps) => {
  const { Component, pageProps } = props;
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <Flex gap={'1rem'} px={'1.5rem'} fontSize={'1.3rem'}>
        <Link href={'/'}>Home</Link>
        <Link href={'/login'}>Login</Link>
        <Link href={'/test'}>Test</Link>
      </Flex>
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
        <ChakraProvider theme={customTheme}>
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
