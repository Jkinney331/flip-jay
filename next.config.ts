import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Force static export for Netlify
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Disable features that require server
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'motion',
      'react-markdown',
      'remark-gfm',
      'marked',
      'three'
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
      };
    }
    return config;
  },
  eslint: {
    dirs: ['src'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;