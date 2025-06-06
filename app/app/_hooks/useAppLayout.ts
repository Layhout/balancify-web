'use client'

import { ROUTES } from '@/lib/constants'
import { useUser } from '@clerk/nextjs'
import { useEffect, useMemo, useState } from 'react'
import { RiDashboardLine, RiDashboardFill } from 'react-icons/ri'
import { AiOutlinePieChart, AiFillPieChart } from 'react-icons/ai'
import { HiOutlineUser, HiUser, HiOutlineUsers, HiUsers } from 'react-icons/hi2'
import { IoSettingsOutline, IoSettings } from 'react-icons/io5'
import { useAtom } from 'jotai'
import { desktopNavToggleAtom } from '@/repositories/layout'
import { IconType } from 'react-icons/lib'
import { usePathname } from 'next/navigation'

export type AppNavLink = {
  title: string
  link: string
  Icon: IconType
  SelectedIcon: IconType
}

export function useAppLayout() {
  const pathname = usePathname()
  const { user, isLoaded: userLoaded } = useUser()
  const [isCollapsed, setIsCollapsed] = useAtom(desktopNavToggleAtom)

  const DesktopNavLinks: AppNavLink[] = useMemo(
    () => [
      {
        title: 'Dashboard',
        link: ROUTES.APP.DASHBOARD,
        Icon: RiDashboardLine,
        SelectedIcon: RiDashboardFill,
      },
      {
        title: 'Expenses',
        link: ROUTES.APP.EXPENSES,
        Icon: AiOutlinePieChart,
        SelectedIcon: AiFillPieChart,
      },
      {
        title: 'Groups',
        link: ROUTES.APP.GROUPS,
        Icon: HiOutlineUsers,
        SelectedIcon: HiUsers,
      },
      {
        title: 'Friends',
        link: ROUTES.APP.FRIENDS,
        Icon: HiOutlineUser,
        SelectedIcon: HiUser,
      },
      {
        title: 'Settings',
        link: ROUTES.APP.SETTINGS,
        Icon: IoSettingsOutline,
        SelectedIcon: IoSettings,
      },
    ],
    [],
  )

  const MobileNavLinks: AppNavLink[] = useMemo(
    () => [
      {
        title: 'Dashboard',
        link: ROUTES.APP.DASHBOARD,
        Icon: RiDashboardLine,
        SelectedIcon: RiDashboardFill,
      },
      {
        title: 'Expenses',
        link: ROUTES.APP.EXPENSES,
        Icon: AiOutlinePieChart,
        SelectedIcon: AiFillPieChart,
      },
      {
        title: 'Groups',
        link: ROUTES.APP.GROUPS,
        Icon: HiOutlineUsers,
        SelectedIcon: HiUsers,
      },
      {
        title: 'Profile',
        link: ROUTES.APP.PROFILE,
        Icon: HiOutlineUser,
        SelectedIcon: HiUser,
      },
    ],
    [],
  )

  const shouldShowMobileNav = useMemo(
    () => MobileNavLinks.map((m) => m.link).includes(pathname),
    [MobileNavLinks, pathname],
  )

  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    const timerId = setTimeout(() => setIsInitialLoading(false), 300)

    return () => clearTimeout(timerId)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    isCollapsed,
    setIsCollapsed,
    user,
    userLoaded,
    DesktopNavLinks,
    isInitialLoading,
    pathname,
    shouldShowMobileNav,
    MobileNavLinks,
  }
}
