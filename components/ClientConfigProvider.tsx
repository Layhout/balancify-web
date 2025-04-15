'use client'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import useTheme from '@/hooks/useTheme'
import { AppProgressBar } from 'next-nprogress-bar'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function ClientConfigProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useTheme()
  useMediaQuery()

  return (
    <TooltipProvider delayDuration={0}>
      {children}
      <AppProgressBar height="4px" color="hsl(var(--primary, black))" options={{ showSpinner: false }} shallowRouting />
    </TooltipProvider>
  )
}
