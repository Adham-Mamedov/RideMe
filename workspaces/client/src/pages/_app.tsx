import type { AppProps } from 'next/app';
import { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import NotificationsProvider from '@client/components/shared/NotificationsProvider';
import AuthProvider from '@client/components/shared/AuthProvider';
import HTMLHead from '@client/components/shared/HTMLHead';

import { customTheme } from '@client/utils/chakra-theme';

import '@client/assets/styles/global.scss';

interface NextAppProps extends AppProps<{ dehydratedState: DehydratedState }> {}

const Page = (props: NextAppProps) => {
  const { Component, pageProps } = props;

  return (
    <>
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
          <NotificationsProvider>
            <AuthProvider>
              <Page {...props} />
            </AuthProvider>
          </NotificationsProvider>
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default NextApp;
