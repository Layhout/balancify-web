'use client'

import { useSettings } from './_hooks/useSettings'
import { PageHeader } from '@/components/PageHeader'
import { NotificationSettings } from './_components/NotificationSettings'
import { ThemeSettings } from './_components/ThemeSettings'
import { isDesktopAtom } from '@/repositories/layout'
import { useAtomValue } from 'jotai'

export default function Settings() {
  const { appTheme, setAppTheme, isAllowNotification, handleSetNotificationPermission } = useSettings()
  const isDesktop = useAtomValue(isDesktopAtom)

  return (
    <div className="container pb-4">
      <PageHeader title="Settings" hasBackBtn={!isDesktop} />
      <NotificationSettings
        isAllowNotification={isAllowNotification}
        handleSetNotificationPermission={handleSetNotificationPermission}
      />
      <ThemeSettings appTheme={appTheme} setAppTheme={setAppTheme} />
    </div>
  )
}
