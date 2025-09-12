import pwa from "next-pwa"

const withPWA = pwa({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */

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

export default withPWA(nextConfig)
