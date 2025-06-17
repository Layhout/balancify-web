'use client'

import { MOBILE_NAV_LINKS } from '@/lib/constants'
import { useEffect, useMemo, useState } from 'react'
import { useAtom } from 'jotai'
import { desktopNavToggleAtom } from '@/repositories/layout'
import { IconType } from 'react-icons/lib'
import { usePathname } from 'next/navigation'
import { useAuth, useUser } from '@clerk/nextjs'
import { onAuthStateChanged, signInWithCustomToken } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import OneSignal from 'react-onesignal'
import { useClientAuth } from '@/hooks/useClientAuth'
import { User } from '@/types/common'
import { isEmpty } from 'lodash'

export type AppNavLink = {
  title: string
  link: string
  Icon: IconType
  SelectedIcon: IconType
}

export function useAppLayout() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useAtom(desktopNavToggleAtom)
  const { getToken, userId } = useAuth()
  const { user: clerkUser, isLoaded } = useUser()
  const { updateDBUser, loadDBUser, localUser } = useClientAuth()

  const shouldShowMobileNav = useMemo(() => MOBILE_NAV_LINKS.map((m) => m.link).includes(pathname), [pathname])

  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded || !userId) return

    loadDBUser(userId)

    if (!localUser) return

    let timerId: NodeJS.Timeout

    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user || user.uid !== userId) {
        const token = await getToken({ template: 'integration_firebase' })

        await signInWithCustomToken(auth, token || '')
      }

      if (process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID)
        await OneSignal.init({
          appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
          // You can add other initialization options here
          // notifyButton: {
          //   enable: true,
          // },
          // Uncomment the below line to run on localhost. See: https://documentation.onesignal.com/docs/local-testing
          allowLocalhostAsSecureOrigin: true,
        })

      const newUserData: Partial<User> = {}

      if (OneSignal.User.onesignalId !== localUser.oneSignalId) {
        newUserData.oneSignalId = OneSignal.User.onesignalId
      }
      if (localUser.imageUrl !== clerkUser?.imageUrl) {
        newUserData.imageUrl = clerkUser?.imageUrl
      }
      if (!isEmpty(newUserData)) {
        updateDBUser(userId, newUserData)
      }

      timerId = setTimeout(() => setIsInitialLoading(false), 300)
    })

    return () => {
      unSubscribe()
      clearTimeout(timerId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, localUser, userId])

  return {
    isCollapsed,
    setIsCollapsed,
    isInitialLoading,
    pathname,
    shouldShowMobileNav,
  }
}
