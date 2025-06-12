'use client'

import { useAppLayout } from './_hooks/useAppLayout'
import { DesktopNav } from './_components/DesktopNav'
import { MobileNav } from './_components/MobileNav'
import { NotificationBar } from './_components/NotificationBar'
import { Splash } from './_components/Splash'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed, isInitialLoading, pathname, setIsCollapsed, shouldShowMobileNav } = useAppLayout()

  return (
    <>
      <div className="flex h-svh max-h-svh gap-6 overflow-hidden">
        <DesktopNav isCollapsed={isCollapsed} pathname={pathname} setIsCollapsed={setIsCollapsed} />
        <main className="relative flex-1 overflow-auto">
          <NotificationBar />
          {children}
          {shouldShowMobileNav && <MobileNav pathname={pathname} />}
        </main>
      </div>
      <Splash show={isInitialLoading} />
    </>
  )
}
