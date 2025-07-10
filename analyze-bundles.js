const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // Your Next.js config
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  
  webpack: (config, { isServer }) => {
    // Add bundle analyzer plugin in development mode
    if (process.env.ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: isServer 
            ? '../analyze/server.html' 
            : './analyze/client.html',
        })
      );
    }
    
    // Optimize moment.js and other large libraries
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\/\*\*.+\*\*\//,
        contextRegExp: /moment[\\/]locale[\\/]/,
      })
    );
    
    // Use ES modules for smaller bundle size
    if (!isServer) {
      config.resolve.alias['lodash'] = 'lodash-es';
    }
    
    return config;
  },
});
