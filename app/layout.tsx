import type { Metadata, Viewport } from 'next'
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
  description: 'Balancify is a simple way to split bills with friends.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
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
          </body>
        </html>
      </JotaiProviders>
    </ClerkProvider>
  )
}
