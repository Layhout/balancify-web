'use client'

import { useClientAuth } from '@/hooks/useClientAuth'
import { BG_COLORS, ROUTES } from '@/lib/constants'
import { User } from '@/types/common'
import { useAuth, useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import shortid from 'shortid'

export default function Authorization() {
  const { userId } = useAuth()
  const { user: clerkUser, isLoaded } = useUser()
  const { setDBUser } = useClientAuth()

  useEffect(() => {
    if (!isLoaded || !userId) return

    async function initUser() {
      const newUserData: User = {
        email: clerkUser?.primaryEmailAddress?.emailAddress || '',
        name: clerkUser?.fullName || '',
        id: userId || '',
        imageUrl: clerkUser?.imageUrl,
        profileBgColor: BG_COLORS[Math.round(Math.random() * BG_COLORS.length - 1)],
        referalCode: shortid.generate(),
      }

      await setDBUser(newUserData)
      redirect(ROUTES.APP.DASHBOARD)
    }

    initUser()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded])

  return null
}
