const { APP_PORT } = process.env;
const appPort = parseInt(APP_PORT, 10) || 3001;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  experimental: {
    externalDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: `http://localhost:${appPort}/api/:path*`,
        },
      ],
    };
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['svg-url-loader'],
    });
    return config;
  },
};

module.exports = nextConfig;
