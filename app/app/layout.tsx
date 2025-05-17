'use client'

import { useAppLayout } from './_hooks/useAppLayout'
import { DesktopNav } from './_components/DesktopNav'
import { MobileNav } from './_components/MobileNav'
import { NotificationBar } from './_components/NotificationBar'
import { Splash } from './_components/Splash'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed, appLinks, userLoaded, user, isInitialLoading, pathname, setIsCollapsed, shouldShowMobileNav } =
    useAppLayout()

  return (
    <>
      <div className="flex h-svh max-h-svh gap-6 overflow-hidden">
        <DesktopNav
          appLinks={appLinks}
          isCollapsed={isCollapsed}
          pathname={pathname}
          setIsCollapsed={setIsCollapsed}
          user={user}
          userLoaded={userLoaded}
        />
        <main className="relative flex-1 overflow-auto">
          <NotificationBar />
          {children}
          {shouldShowMobileNav && <MobileNav appLinks={appLinks} pathname={pathname} />}
        </main>
      </div>
      <Splash show={isInitialLoading} />
    </>
  )
}
