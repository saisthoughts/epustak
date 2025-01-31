/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sjc.microlink.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'aimrevolution.com',
        port: '',
        pathname: '/wp-content/**',
      },
    ],
  },
}

module.exports = nextConfig
