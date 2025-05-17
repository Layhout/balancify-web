'use client'

import { useSettings } from './_hooks/useSettings'
import { PageHeader } from '@/components/PageHeader'
import { NotificationSettings } from './_components/NotificationSettings'
import { ThemeSettings } from './_components/ThemeSettings'

export default function Settings() {
  const { appTheme, setAppTheme } = useSettings()

  return (
    <div className="container pb-4">
      <PageHeader title="Settings" />
      <NotificationSettings />
      <ThemeSettings appTheme={appTheme} setAppTheme={setAppTheme} />
    </div>
  )
}
