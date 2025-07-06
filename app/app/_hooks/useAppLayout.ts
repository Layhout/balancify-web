'use client'

import { MOBILE_NAV_LINKS } from '@/lib/constants'
import { useMemo, useState } from 'react'
import { useAtom } from 'jotai'
import { desktopNavToggleAtom } from '@/repositories/layout'
import { IconType } from 'react-icons/lib'
import { usePathname } from 'next/navigation'
import { useClientAuth } from '@/hooks/useClientAuth'

export type AppNavLink = {
  title: string
  link: string
  Icon: IconType
  SelectedIcon: IconType
}

export function useAppLayout() {
  const pathname = usePathname()
  console.log(pathname)

  const [isCollapsed, setIsCollapsed] = useAtom(desktopNavToggleAtom)

  const shouldShowMobileNav = useMemo(() => MOBILE_NAV_LINKS.map((m) => m.link).includes(pathname), [pathname])

  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useClientAuth(() => setIsInitialLoading(false))

  return {
    isCollapsed,
    setIsCollapsed,
    isInitialLoading,
    pathname,
    shouldShowMobileNav,
  }
}
