import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "brand.stripe.com",
      },
    ],
  },
  // Performance optimizations
  experimental: {
    // Optimize package imports for tree-shaking
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'motion',
      'react-markdown',
      'remark-gfm',
      'marked',
    ],
  },
  // Bundle optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Keep TypeScript and ESLint enabled for production safety
  eslint: {
    dirs: ['src'], // Only lint src directory for faster builds
  },
  typescript: {
    ignoreBuildErrors: false, // Catch TypeScript errors in production
  },
};

export default nextConfig;
