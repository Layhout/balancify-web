'use client'

import { BG_COLORS, FIREBASE_COLLTION_NAME, MOBILE_NAV_LINKS } from '@/lib/constants'
import { useEffect, useMemo, useState } from 'react'
import { useAtom } from 'jotai'
import { desktopNavToggleAtom } from '@/repositories/layout'
import { IconType } from 'react-icons/lib'
import { usePathname } from 'next/navigation'
import { useAuth, useUser } from '@clerk/nextjs'
import { onAuthStateChanged, signInWithCustomToken } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import OneSignal from 'react-onesignal'
import { userAtom } from '@/repositories/user'
import { User } from '@/types/common'
import { isEqual, omit } from 'lodash'
import { firestore } from '@/lib/firestore'

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
  const [lcoalUser, setLocalUser] = useAtom(userAtom)

  const shouldShowMobileNav = useMemo(() => MOBILE_NAV_LINKS.map((m) => m.link).includes(pathname), [pathname])

  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded || !userId) return

    let timerId: NodeJS.Timeout
    let unSubscribe: () => void

    unSubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user && userId) {
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

      const newUserData: User = {
        email: clerkUser?.primaryEmailAddress?.emailAddress || '',
        firstName: clerkUser?.firstName || '',
        fullName: clerkUser?.fullName || '',
        lastName: clerkUser?.lastName || '',
        id: userId || '',
        imageUrl: clerkUser?.imageUrl,
        oneSignalId: OneSignal.User.onesignalId || '',
      }

      if (!isEqual(omit(lcoalUser, 'profileBgColor'), newUserData)) {
        newUserData.profileBgColor = BG_COLORS[Math.round(Math.random() * BG_COLORS.length - 1)]
        setLocalUser(newUserData)
        firestore.setData(FIREBASE_COLLTION_NAME.USERS, userId!, newUserData)
      }

      timerId = setTimeout(() => setIsInitialLoading(false), 300)
    })

    return () => {
      unSubscribe()
      clearTimeout(timerId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded])

  return {
    isCollapsed,
    setIsCollapsed,
    isInitialLoading,
    pathname,
    shouldShowMobileNav,
  }
}
