import Head from 'next/head';
import type { FC } from 'react';

interface HTMLHeadProps {
  title?: string;
  description?: string;
}

const HTMLHead: FC<HTMLHeadProps> = (props) => {
  const { title = 'RideME', description = 'Service for shared bicycles' } =
    props;

  return (
    <Head>
      <title>{title}</title>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={'/images/rideMe_favicon.png'}
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
    </Head>
  );
};

export default HTMLHead;
