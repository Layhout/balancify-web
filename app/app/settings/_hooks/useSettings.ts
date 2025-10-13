import { appThemeAtom } from '@/repositories/layout'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { userAtom } from '@/repositories/user'
import { useMutation } from '@tanstack/react-query'
import { User } from '@/types/common'
import { getFcmToken } from '@/lib/firebase'
import { updateUser } from '@/features/user'

export function useSettings() {
  const [appTheme, setAppTheme] = useAtom(appThemeAtom)
  const [localUser, setLocalUser] = useAtom(userAtom)

  const [isAllowNotification, setIsAllowNotification] = useState(false)

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
  })

  useEffect(() => {
    setIsAllowNotification(Notification.permission === 'granted' && !!localUser?.notiToken && !!localUser?.subNoti)
  }, [localUser?.notiToken, localUser?.subNoti])

  const handleSetNotificationPermission = async (v: boolean) => {
    let token = '',
      subNoti = false

    if (v) {
      token = (await getFcmToken()) || ''
      subNoti = true
    }

    await updateUserMutation.mutateAsync({ user: { notiToken: token, subNoti } })
    setLocalUser((p) => ({ ...p, notiToken: token, subNoti }) as User)
  }

  return {
    appTheme,
    setAppTheme,
    isAllowNotification,
    handleSetNotificationPermission,
  }
}
