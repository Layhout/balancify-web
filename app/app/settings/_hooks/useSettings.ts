import { appThemeAtom } from '@/repositories/layout'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

export function useSettings() {
  const [appTheme, setAppTheme] = useAtom(appThemeAtom)

  const [isAllowNotification, setIsAllowNotification] = useState(false)

  useEffect(() => {
    setIsAllowNotification(Notification.permission === 'granted')
  }, [])

  const handleSetNotificationPermission = () => {}

  return {
    appTheme,
    setAppTheme,
    isAllowNotification,
    handleSetNotificationPermission,
  }
}
