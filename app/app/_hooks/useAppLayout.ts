'use client'

import { MOBILE_NAV_LINKS, QUERY_KEYS } from '@/lib/constants'
import { useMemo, useState } from 'react'
import { useAtom } from 'jotai'
import { desktopNavToggleAtom } from '@/repositories/layout'
import { IconType } from 'react-icons/lib'
import { usePathname } from 'next/navigation'
import { useClientAuth } from '@/hooks/useClientAuth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import feature from '@/features'
import { Noti } from '@/types/common'

export type AppNavLink = {
  title: string
  link: string
  Icon: IconType
  SelectedIcon: IconType
}

export function useAppLayout() {
  const pathname = usePathname()
  const queryClient = useQueryClient()

  const [isCollapsed, setIsCollapsed] = useAtom(desktopNavToggleAtom)

  const shouldShowMobileNav = useMemo(() => MOBILE_NAV_LINKS.map((m) => m.link).includes(pathname), [pathname])

  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useClientAuth(() => setIsInitialLoading(false))

  const notiQuery = useQuery({
    queryKey: [QUERY_KEYS.NOTI, 'list'],
    queryFn: feature.noti.getNotis,
  })

  const readNotiMutation = useMutation({
    mutationFn: feature.noti.readNoti,
    onSuccess: () => {
      queryClient.setQueryData(
        [QUERY_KEYS.NOTI, 'list'],
        notis.map((n) => ({ ...n, read: true })),
      )
    },
  })

  const notis = useMemo(() => (notiQuery.data || []) as Noti[], [notiQuery.data])

  const hasUnreadNoti = useMemo(() => notis.some((n) => !n.read), [notis])

  const onNotiOpen = (v: boolean) => {
    if (!v || !hasUnreadNoti) return

    readNotiMutation.mutate({ notis })
  }

  return {
    isCollapsed,
    setIsCollapsed,
    isInitialLoading,
    pathname,
    shouldShowMobileNav,
    notis,
    hasUnreadNoti,
    onNotiOpen,
  }
}
