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
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });

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
          priority: 50,
          enforce: true,
        },
        ton: {
          test: /[\\/]node_modules[\\/](@ton\/core|@ton\/crypto)[\\/]/,
          name: 'ton-libs',
          chunks: 'all',
          priority: 10,
        },
        common: {
          minChunks: 3,
          name: 'common',
          priority: -10,
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
