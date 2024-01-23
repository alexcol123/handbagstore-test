/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
      },

      {
        protocol: 'https',
        hostname: 'michaelkors.scene7.com',
        port: '',
      },


      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },


      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
