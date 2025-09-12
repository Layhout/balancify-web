import type { Metadata, Viewport } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { ClerkProvider } from '@clerk/nextjs'

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
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  colorScheme: 'light dark',
  themeColor: '#F59E0B',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
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
    </ClerkProvider>
  )
}
