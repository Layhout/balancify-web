/** @type {import('next').NextConfig} */

// import packageJson from './package.json'

const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  transpilePackages: ['react-icons'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*', // Match all domains and subdomains
      },
    ],
  },
}

export default nextConfig
