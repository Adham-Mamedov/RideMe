import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import HTMLHead from '../components/shared/HTMLHead';

import '../assets/styles/global.scss';
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { useState } from 'react';

interface NextAppProps extends AppProps<{ dehydratedState: DehydratedState }> {}

const Page = (props: AppProps) => {
  const { Component, pageProps } = props;

  return <Component {...pageProps} />;
};

const NextApp = (props: NextAppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={props.pageProps.dehydratedState}>
        <ChakraProvider>
          <HTMLHead />
          <Page {...props} />
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default NextApp;
