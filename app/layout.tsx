import type { Metadata, Viewport } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'

import { poppins } from '@/lib/font'

import './globals.css'
import { cn } from '@/lib/utils'

import { JotaiProviders } from '@/components/AppProviders'
import { ClientConfigProvider } from '@/components/ClientConfigProvider'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: 'Balancify',
  description:
    'The all-in-one app for splitting bills and tracking group expenses. Keep everyone on the same page and settle up in seconds.',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: [
    'Balancify',
    'Split bills',
    'Group expenses',
    'Settle up',
    'Split expenses',
    'Group finance',
    'Group budget',
  ],
  authors: [{ name: 'Layhout Chea', url: 'https://layhout.is-a.dev' }],
  applicationName: 'Balancify',
  openGraph: {
    type: 'website',
    locale: 'en',
    siteName: 'Balancify',
    url: 'https://balancify.vercel.app/',
    title: 'Balancify',
    description:
      'The all-in-one app for splitting bills and tracking group expenses. Keep everyone on the same page and settle up in seconds.',
    images: [
      {
        url: 'https://balancify.vercel.app/assets/images/180.png',
        width: 180,
        height: 180,
        alt: 'Balancify',
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: 'Balancify',
    statusBarStyle: 'default',
  },
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
      sizes: 'any',
    },
    {
      rel: 'apple-touch-icon',
      url: '/assets/images/180.png',
      sizes: '180x180',
    },
  ],
  other: {
    'mobile-web-app-capable': 'yes',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  colorScheme: 'light dark',
  themeColor: '#000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <JotaiProviders>
      <html lang="en">
        <body className={cn('font-sans antialiased', poppins.variable)}>
          <ClientConfigProvider>
            <main className="relative min-h-svh bg-background">{children}</main>
          </ClientConfigProvider>
          <Analytics />
          <SpeedInsights />
          <GoogleAnalytics gaId="G-LHBME1XNPE" />
        </body>
      </html>
    </JotaiProviders>
  )
}
