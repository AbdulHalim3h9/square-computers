const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React's experimental compiler for better performance
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-slot',
      '@radix-ui/react-tabs',
      'framer-motion',
    ],
    optimizeCss: true,
    scrollRestoration: true,
    optimizeServerReact: true,
  },
  
  // External packages for server components
  serverExternalPackages: ['sharp', 'onnxruntime-node'],
  
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,
  
  // Enable SWC minification
  swcMinify: true,
  
  // Enable static exports for optimal performance
  output: 'standalone',
  
  // Enable production browser source maps
  productionBrowserSourceMaps: false,
  
  // Enable compression
  compress: true,
  
  // Configure headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  
  // Configure images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.seeklogo.com',
      },
      {
        protocol: 'https',
        hostname: 'brandlogos.net',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'www.lg.com',
      },
      {
        protocol: 'https',
        hostname: 'www.digimarkbd.com',
      },
    ],
  },
  
  // Webpack optimizations
  webpack: (config, { isServer, webpack }) => {
    // Optimize moment.js locales
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\/\*\*.+\*\*\//,
        contextRegExp: /moment[\\/]locale[\\/]/,
      })
    );
    
    // Use ES modules for smaller bundle size
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        lodash: 'lodash-es'
      };
    }
    
    return config;
  },
}

module.exports = nextConfig
