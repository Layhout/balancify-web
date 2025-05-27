'use client'

import { ROUTES } from '@/lib/constants'
import { isDarkModeAtom } from '@/repositories/layout'
import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useAtomValue } from 'jotai'

export default function Page() {
  const isDarkMode = useAtomValue(isDarkModeAtom)

  return (
    <SignIn
      path={ROUTES.LANDING.SIGN_IN}
      afterSignInUrl={ROUTES.APP.DASHBOARD}
      appearance={{ baseTheme: isDarkMode ? dark : undefined }}
    />
  )
}
