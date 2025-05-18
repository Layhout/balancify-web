'use client'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import useTheme from '@/hooks/useTheme'
import { ProgressProvider } from '@bprogress/next/app'
import { TooltipProvider } from '@/components/ui/tooltip'

export function ClientConfigProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useTheme()
  useMediaQuery()

  return (
    <TooltipProvider delayDuration={0}>
      <ProgressProvider height="4px" color="hsl(var(--primary, black))" options={{ showSpinner: false }} shallowRouting>
        {children}
      </ProgressProvider>
    </TooltipProvider>
  )
}
