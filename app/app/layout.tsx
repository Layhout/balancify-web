'use client'

import { useAppLayout } from './_hooks/useAppLayout'
import { DesktopNav } from './_components/DesktopNav'
import { MobileNav } from './_components/MobileNav'
import { NotificationBar } from './_components/NotificationBar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed, pathname, setIsCollapsed, shouldShowMobileNav, unreadNotis, onNotiOpen, isNotiOpen } =
    useAppLayout()

  return (
    <>
      <div className="flex h-svh max-h-svh gap-6 overflow-hidden">
        <DesktopNav isCollapsed={isCollapsed} pathname={pathname} setIsCollapsed={setIsCollapsed} />
        <main className="relative flex-1">
          <ScrollArea className="h-dvh">
            <NotificationBar
              notis={unreadNotis}
              hasUnreadNoti={!!unreadNotis.length}
              onNotiOpen={onNotiOpen}
              isNotiOpen={isNotiOpen}
            />
            {children}
            {shouldShowMobileNav && <MobileNav pathname={pathname} />}
          </ScrollArea>
        </main>
      </div>
      <PWAInstallPrompt />
    </>
  )
}
