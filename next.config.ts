import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@ton/core'],
    gzipSize: true,
    useLightningcss: true,
  },
  swcMinify: true,
  reactStrictMode: true,

  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
            },
          },
        ],
        as: '*.js',
      },
    },
  },

  async rewrites() {
    return [
      {
        source: '/api/ton/:path*',
        destination: 'https://testnet.tonapi.io/v2/:path*',
      },
      {
        source: '/api/web3/:path*',
        destination: 'https://serv.gamler.online/web3/api/:path*',
      },
      {
        source: '/api/web2/:path*',
        destination: 'https://serv.gamler.atma-dev.ru/:path*',
      },
    ];
  },
};

export default nextConfig;
