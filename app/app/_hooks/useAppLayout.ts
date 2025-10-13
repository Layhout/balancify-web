'use client'

import { MOBILE_NAV_LINKS, QUERY_KEYS, QueryType } from '@/lib/constants'
import { useMemo, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { desktopNavToggleAtom } from '@/repositories/layout'
import { IconType } from 'react-icons/lib'
import { usePathname } from 'next/navigation'
import { useClientAuth } from '@/hooks/useClientAuth'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Noti } from '@/types/common'
import { userAtom } from '@/repositories/user'
import { getUnreadNotis, readNoti } from '@/features/noti'

export type AppNavLink = {
  title: string
  link: string
  Icon: IconType
  SelectedIcon: IconType
}

export function useAppLayout() {
  const pathname = usePathname()
  const localUser = useAtomValue(userAtom)

  const [isCollapsed, setIsCollapsed] = useAtom(desktopNavToggleAtom)

  const shouldShowMobileNav = useMemo(() => MOBILE_NAV_LINKS.map((m) => m.link).includes(pathname), [pathname])

  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isNotiOpen, setIsNotiOpen] = useState(false)

  useClientAuth(() => setIsInitialLoading(false))

  const queryKey = [QUERY_KEYS.NOTI, QueryType.List, localUser?.id]

  const unreadNotiQuery = useQuery({
    queryKey,
    queryFn: getUnreadNotis,
  })

  const unreadNotis = useMemo(() => (unreadNotiQuery.data || []) as Noti[], [unreadNotiQuery.data])

  const readNotiMutation = useMutation({
    mutationFn: readNoti,
  })

  const onNotiOpen = (v: boolean) => {
    setIsNotiOpen(v)

    if (!v || !unreadNotis.length) return

    readNotiMutation.mutate({ notiIds: unreadNotis.map((n) => n.id) })
  }

  return {
    isCollapsed,
    setIsCollapsed,
    isInitialLoading,
    pathname,
    shouldShowMobileNav,
    unreadNotis,
    onNotiOpen,
    isNotiOpen,
    setIsNotiOpen,
  }
}
