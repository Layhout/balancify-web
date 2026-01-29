import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import shortid from 'shortid'
import { toast } from 'sonner'

import { addFriendByReferalCode } from '@/features/friend'
import { createUser, findUserById, updateUser } from '@/features/user'
import { BG_COLORS, QUERY_KEYS, QueryType, ROUTES } from '@/lib/constants'
import { auth, getFcmToken } from '@/lib/firebase'
import { userAtom } from '@/repositories/user'
import type { User } from '@/types/common'

export const useClientAuth = (onFinishLoading?: () => void) => {
  const router = useRouter()
  const pathname = usePathname()

  const [localUser, setLocalUser] = useAtom(userAtom)
  const [user, loading] = useAuthState(auth)
  const [idQuery, setIdQuery] = useState('')

  const createUserMutation = useMutation({
    mutationFn: createUser,
  })

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
  })

  const inviteMutation = useMutation({
    mutationFn: addFriendByReferalCode,
    onError: (error) => {
      toast(error.message)
    },
  })

  const findUserQuery = useQuery({
    queryKey: [QUERY_KEYS.USER, QueryType.Search, idQuery],
    queryFn: () => findUserById(idQuery),
    enabled: false,
  })

  const setDBUser = async (newUser: User) => {
    await createUserMutation.mutateAsync(newUser)
    setLocalUser(newUser)
  }

  const updateDBUser = async (partialUser: Partial<User>) => {
    await updateUserMutation.mutateAsync({ user: partialUser })
    setLocalUser((prev) => ({ ...prev, ...partialUser }) as User)
  }

  const initUser = async () => {
    const newUserData: User = {
      email: user?.email || '',
      name: user?.displayName || '',
      id: user?.uid || '',
      imageUrl: user?.photoURL || '',
      profileBgColor: BG_COLORS[Math.round(Math.random() * BG_COLORS.length - 1)],
      referalCode: shortid.generate(),
      notiToken: '',
    }

    await setDBUser(newUserData)
  }

  const getReferalCodeFromUrl = () => {
    if (!pathname.includes(ROUTES.APP.INVITE)) return

    const referalCode = pathname.split('/')[3]

    return referalCode
  }

  const handleInviteIfNeeded = async (referalCode: string) => {
    try {
      await inviteMutation.mutateAsync({ referalCode })
    } catch {}

    router.replace(ROUTES.APP.DASHBOARD)
  }

  const initializeNotificationIfNeeded = async () => {
    if (!localUser) return

    try {
      const token = await getFcmToken()

      if (!token) {
        return
      }

      if (localUser.notiToken === token || localUser.subNoti === false) {
        return
      }

      await updateDBUser({ notiToken: token, subNoti: true })
    } catch (error) {
      console.error('Error Requesting Notification Permission:', error)
    }
  }

  useEffect(() => {
    if (!idQuery) return

    async function loadUser() {
      const result = await findUserQuery.refetch()
      if (!result.data) {
        initUser()
      } else {
        setLocalUser(result.data as User)
      }
    }

    loadUser()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idQuery])

  const referalCodeRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (loading) return

    referalCodeRef.current ??= getReferalCodeFromUrl()

    if (!user) {
      router.replace(ROUTES.LANDING.HOME)
      onFinishLoading?.()
      return
    }

    if (localUser?.id !== user.uid) {
      setIdQuery(user.uid)
      return
    }

    ;(async () => {
      if (referalCodeRef.current) await handleInviteIfNeeded(referalCodeRef.current)
      onFinishLoading?.()
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user, localUser?.id])

  useEffect(() => {
    if (!localUser) return

    initializeNotificationIfNeeded()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localUser?.id])

  useEffect(() => {
    if (loading || user) return

    if (pathname !== ROUTES.LANDING.HOME && !user) {
      router.replace(ROUTES.LANDING.HOME)
    }
  }, [loading, pathname, router, user])
}
