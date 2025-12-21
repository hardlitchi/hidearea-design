import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["example.tokens.design.sb.hidearea.net"],
  transpilePackages: [
    '@hidearea-design/core',
    '@hidearea-design/react',
    '@hidearea-design/tokens',
  ],
};

export default nextConfig;
