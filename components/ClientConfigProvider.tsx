'use client'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import useTheme from '@/hooks/useTheme'
import { AppProgressBar } from 'next-nprogress-bar'

export default function ClientConfigProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useTheme()
  useMediaQuery()

  return (
    <>
      {children}
      <AppProgressBar height="4px" color="hsl(var(--primary, black))" options={{ showSpinner: false }} shallowRouting />
    </>
  )
}
