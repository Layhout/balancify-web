'use client'

import { Splash } from '../_components/Splash'

export default function AuthorizationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Splash />
    </>
  )
}
