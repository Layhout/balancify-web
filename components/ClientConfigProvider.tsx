'use client'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useTheme } from '@/hooks/useTheme'
import { ProgressProvider } from '@bprogress/next/app'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from './ui/sonner'
import { Suspense, useState } from 'react'
import { useClientAuth } from '@/hooks/useClientAuth'
import { Splash } from '@/app/app/_components/Splash'

export function ClientConfigProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useTheme()
  useMediaQuery()

  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useClientAuth(() => setIsInitialLoading(false))

  return (
    <>
      <TooltipProvider delayDuration={0}>
        <Suspense>
          <ProgressProvider
            height="4px"
            color="hsl(var(--primary, black))"
            options={{ showSpinner: false }}
            shallowRouting
          >
            {children}
          </ProgressProvider>
        </Suspense>
        <Toaster position="top-right" />
      </TooltipProvider>
      <Splash show={isInitialLoading} />
    </>
  )
}
