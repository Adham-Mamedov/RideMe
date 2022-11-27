import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import HTMLHead from '../components/shared/HTMLHead';

import '../assets/styles/global.scss';

const Page = (props: AppProps) => {
  const { Component, pageProps } = props;

  return <Component {...pageProps} />;
};

const NextApp = (props: AppProps) => {
  return (
    <ChakraProvider>
      <HTMLHead />
      <Page {...props} />
    </ChakraProvider>
  );
};

export default NextApp;
