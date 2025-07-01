import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@ton/core'],
    gzipSize: true,
    webpackMemoryOptimizations: true,
  },
  reactStrictMode: true,
  compress: true,

  webpack(config) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    config.optimization.splitChunks = {
      chunks: 'all',
      // minSize: 20000,
      // maxSize: 244000,
      // minChunks: 1,
      // maxAsyncRequests: 30,
      // maxInitialRequests: 30,
      // enforceSizeThreshold: 50000,
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
          name: 'react-core',
          chunks: 'all',
          priority: 60,
          enforce: true,
        },
        ton: {
          test: /[\\/]node_modules[\\/](@ton\/core|@tonconnect\/ui-react|@ton\/crypto)[\\/]/,
          name: 'ton-libs',
          chunks: 'all',
          priority: 50,
          enforce: true,
        },
        common: {
          minChunks: 3,
          name: 'common',
          priority: 10,
          reuseExistingChunk: true,
        },
      },
    };

    config.optimization.chunkIds = 'deterministic';
    config.optimization.runtimeChunk = 'single';

    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },

  async rewrites() {
    return [
      {
        source: '/api/ton/:path*',
        destination: 'https://tonapi.io/v2/:path*',
        basePath: false,
      },
      {
        source: '/api/web3/:path*',
        destination: 'https://serv.gamler.online/web3/api/:path*',
        basePath: false,
        //https://serv.gamler.online/web3/api/:path*
        //http://127.0.0.1:6069/api/:path*
      },
      {
        source: '/api/web2/:path*',
        destination: 'https://serv.gamler.atma-dev.ru/:path*',
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
