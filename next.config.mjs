/** @type {import('next').NextConfig} */

import packageJson from './package.json' assert { type: 'json' }

const nextConfig = {
  env: {
    version: packageJson.version,
  },
  experimental: {
    // swcPlugins: [['@swc-jotai/react-refresh', {}]],
  },
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
