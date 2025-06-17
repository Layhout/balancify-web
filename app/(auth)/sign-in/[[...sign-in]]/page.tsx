'use client'

import { useClientAuth } from '@/hooks/useClientAuth'
import { ROUTES } from '@/lib/constants'
import { isDarkModeAtom } from '@/repositories/layout'
import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'

export default function Page() {
  const isDarkMode = useAtomValue(isDarkModeAtom)
  const { clearClientUser } = useClientAuth()

  useEffect(
    () => {
      clearClientUser()
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <SignIn
      path={ROUTES.LANDING.SIGN_IN}
      afterSignInUrl={ROUTES.APP.DASHBOARD}
      afterSignUpUrl={ROUTES.APP.AUTHORIZATION}
      appearance={{ baseTheme: isDarkMode ? dark : undefined }}
    />
  )
}
