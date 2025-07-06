'use client'

import { ROUTES } from '@/lib/constants'
import { isDarkModeAtom } from '@/repositories/layout'
import { userAtom } from '@/repositories/user'
import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useAtomValue, useSetAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import { useEffect } from 'react'

export default function Page() {
  const isDarkMode = useAtomValue(isDarkModeAtom)
  const setLocalUser = useSetAtom(userAtom)

  useEffect(() => {
    setLocalUser(RESET)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SignIn
      path={ROUTES.LANDING.SIGN_IN}
      afterSignInUrl={ROUTES.APP.DASHBOARD}
      afterSignUpUrl={ROUTES.APP.DASHBOARD}
      appearance={{ baseTheme: isDarkMode ? dark : undefined }}
    />
  )
}
