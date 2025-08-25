'use client'

import { useAppLayout } from './_hooks/useAppLayout'
import { DesktopNav } from './_components/DesktopNav'
import { MobileNav } from './_components/MobileNav'
import { NotificationBar } from './_components/NotificationBar'
import { Splash } from './_components/Splash'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed, isInitialLoading, pathname, setIsCollapsed, shouldShowMobileNav, unreadNotis, onNotiOpen } =
    useAppLayout()

  return (
    <>
      <div className="flex h-svh max-h-svh gap-6 overflow-hidden">
        <DesktopNav isCollapsed={isCollapsed} pathname={pathname} setIsCollapsed={setIsCollapsed} />
        <main className="relative flex-1">
          <ScrollArea className="h-dvh">
            <NotificationBar notis={unreadNotis} hasUnreadNoti={!!unreadNotis.length} onNotiOpen={onNotiOpen} />
            {children}
            {shouldShowMobileNav && <MobileNav pathname={pathname} />}
          </ScrollArea>
        </main>
      </div>
      <Splash show={isInitialLoading} />
    </>
  )
}
