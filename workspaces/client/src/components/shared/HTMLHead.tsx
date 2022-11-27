import Head from 'next/head';
import type { FC } from 'react';

interface HTMLHeadProps {
  title?: string;
  description?: string;
}

const HTMLHead: FC<HTMLHeadProps> = (props) => {
  const { title = 'Next.js Boilerplate', description = 'Next.js Boilerplate' } =
    props;

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
    </Head>
  );
};

export default HTMLHead;
