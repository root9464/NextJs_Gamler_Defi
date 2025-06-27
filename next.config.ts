import { transform } from '@formatjs/ts-transformer';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@ton/core'],
    gzipSize: true,
    webpackMemoryOptimizations: true,
  },
  swcMinify: true,
  reactStrictMode: true,
  compress: true,

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    // @ts-ignore
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader', // or 'next-babel-loader'
        options: {
          transpileOnly: true,
          // make sure not to set `transpileOnly: true` here, otherwise it will not work
          getCustomTransformers: () => ({
            before: [
              transform({
                overrideIdFn: '[sha512:contenthash:base64:6]',
              }),
            ],
          }),
        },
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
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
