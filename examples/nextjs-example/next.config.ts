import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@hidearea-design/core',
    '@hidearea-design/react',
    '@hidearea-design/tokens',
  ],
};

export default nextConfig;
