import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure proper static file serving
  distDir: '.next',
  images: {
    remotePatterns: [],
  },
  // Disable static export to use SSR features
  output: undefined, // Let Next.js decide based on the deployment
  
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
      'three'
    ],
  },
  // Bundle optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Three.js optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
      };
      
      // Tree-shake Three.js
      config.optimization = {
        ...config.optimization,
        sideEffects: false,
      };
    }
    return config;
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