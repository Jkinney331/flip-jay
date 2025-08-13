import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Enable SWC minification (faster than Terser)
  swcMinify: true,
  
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  // Security and performance headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com https://www.googletagmanager.com https://plausible.io;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com data:;
              img-src 'self' data: https: blob:;
              media-src 'self' https: blob:;
              connect-src 'self' https://vitals.vercel-insights.com https://vercel.live https://plausible.io https://www.google-analytics.com wss://;
              frame-ancestors 'none';
              base-uri 'self';
              form-action 'self';
              upgrade-insecure-requests;
            `.replace(/\s+/g, ' ').trim()
          }
        ]
      },
      // Cache static assets aggressively
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000'
          }
        ]
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000'
          }
        ]
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      // API routes with shorter cache
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300'
          }
        ]
      },
      // HTML pages with ISR
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=10, stale-while-revalidate=59'
          }
        ]
      }
    ];
  },

  // Experimental features for better performance
  experimental: {
    // Optimize package imports for tree-shaking
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      '@radix-ui/react-accordion',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-slot',
      '@radix-ui/react-tabs',
      'motion',
      'react-markdown',
      'remark-gfm',
      'marked',
      'three',
      'postprocessing',
      'cobe',
      'ogl',
      '@number-flow/react',
      'embla-carousel-react',
      'embla-carousel-auto-scroll',
    ],
    
    // Enable server components optimization
    serverComponentsExternalPackages: ['three', 'ogl', 'postprocessing'],
    
    // Optimize CSS
    optimizeCss: true,
    
    // Enable Turbopack for development (if using Next.js 14+)
    // turbo: {
    //   rules: {
    //     '*.svg': {
    //       loaders: ['@svgr/webpack'],
    //       as: '*.js',
    //     },
    //   },
    // },
    
    // Partial pre-rendering (experimental)
    ppr: true,
    
    // Optimize server actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
    
    // Enable instrumentation hook
    instrumentationHook: true,
  },

  // Compiler optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ['error', 'warn'],
    } : false,
    
    // Enable emotion optimization if using emotion
    // emotion: true,
    
    // Enable styled-components optimization if using styled-components
    // styledComponents: true,
  },

  // Webpack configuration for advanced optimizations
  webpack: (config, { dev, isServer, webpack }) => {
    // Optimize for production
    if (!dev && !isServer) {
      // Replace React with Preact in production (optional, aggressive optimization)
      // config.resolve.alias = {
      //   ...config.resolve.alias,
      //   'react': 'preact/compat',
      //   'react-dom': 'preact/compat',
      // };

      // Optimize Three.js imports
      config.resolve.alias = {
        ...config.resolve.alias,
        'three': 'three/build/three.module.js',
      };

      // Add module resolution for performance
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        module: false,
      };

      // Optimize chunks
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Framework chunk
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-sync-external-store)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Library chunk
            lib: {
              test(module: any) {
                return module.size() > 160000 &&
                  /node_modules[\\/]/.test(module.identifier());
              },
              name(module: any) {
                const hash = require('crypto')
                  .createHash('sha1')
                  .update(module.identifier())
                  .digest('hex');
                return `lib-${hash.substring(0, 8)}`;
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            // Commons chunk
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
            },
            // Three.js specific chunk
            three: {
              test: /[\\/]node_modules[\\/](three|@react-three|postprocessing|meshoptimizer)[\\/]/,
              name: 'three',
              chunks: 'all',
              priority: 35,
              enforce: true,
            },
            // UI libraries chunk
            ui: {
              test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|embla-carousel|motion)[\\/]/,
              name: 'ui',
              chunks: 'all',
              priority: 33,
            },
            // Shared chunk
            shared: {
              name(module: any, chunks: any) {
                return `shared-${require('crypto')
                  .createHash('sha1')
                  .update(chunks.map((c: any) => c.name).join('_'))
                  .digest('hex')
                  .substring(0, 8)}`;
              },
              priority: 10,
              minChunks: 2,
              reuseExistingChunk: true,
            },
          },
          maxAsyncRequests: 30,
          maxInitialRequests: 25,
          minSize: 20000,
        },
        sideEffects: false,
        usedExports: true,
        minimize: true,
      };

      // Add webpack plugins
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NEXT_RUNTIME': JSON.stringify('browser'),
        })
      );

      // Enable module concatenation
      config.optimization.concatenateModules = true;
    }

    // Add performance hints
    if (!dev) {
      config.performance = {
        hints: 'warning',
        maxEntrypointSize: 512000, // 500KB
        maxAssetSize: 512000, // 500KB
      };
    }

    return config;
  },

  // Production optimizations
  productionBrowserSourceMaps: false, // Disable source maps in production
  
  // Output configuration
  output: 'standalone', // For optimized Docker deployments
  
  // Disable powered by header
  poweredByHeader: false,
  
  // Enable compression
  compress: true,
  
  // Generate build ID based on git commit
  generateBuildId: async () => {
    // Use git commit hash as build ID
    return process.env.GIT_COMMIT_SHA || 'development';
  },

  // TypeScript and ESLint configuration
  eslint: {
    dirs: ['src'], // Only lint src directory for faster builds
    ignoreDuringBuilds: false, // Don't ignore ESLint errors in production
  },
  
  typescript: {
    ignoreBuildErrors: false, // Catch TypeScript errors in production
  },

  // Redirects for better SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Rewrites for API proxying if needed
  async rewrites() {
    return [
      // Example: Proxy API requests
      // {
      //   source: '/api/external/:path*',
      //   destination: 'https://api.example.com/:path*',
      // },
    ];
  },

  // Environment variables validation
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://fliptechpro.com',
  },

  // Module resolution
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
    '@radix-ui/react-icons': {
      transform: '@radix-ui/react-icons/dist/{{member}}',
    },
  },
};

// Export with bundle analyzer wrapper
export default bundleAnalyzer(nextConfig);