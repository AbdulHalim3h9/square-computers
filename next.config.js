/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
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
}

module.exports = nextConfig
