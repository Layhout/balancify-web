import { addFriendByReferalCode, createUser, findUserById, updateUser } from '@/features'
import { BG_COLORS, QUERY_KEYS, QueryType, ROUTES } from '@/lib/constants'
import { auth } from '@/lib/firebase'
import { userAtom } from '@/repositories/user'
import { User } from '@/types/common'
import { useAuth, useUser } from '@clerk/nextjs'
import { useMutation, useQuery } from '@tanstack/react-query'
import { onAuthStateChanged, signInWithCustomToken } from 'firebase/auth'
import { useAtom } from 'jotai'
import { isEmpty } from 'lodash'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import OneSignal from 'react-onesignal'
import shortid from 'shortid'
import { toast } from 'sonner'

export const useClientAuth = (onFinishLoading?: () => void) => {
  const router = useRouter()
  const pathname = usePathname()

  const [localUser, setLocalUser] = useAtom(userAtom)

  const { user: clerkUser, isLoaded } = useUser()
  const { getToken, userId } = useAuth()

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

  const setDBUser = async (user: User) => {
    await createUserMutation.mutateAsync(user)
    setLocalUser(user)
  }

  const updateDBUser = async (partialUser: Partial<User>) => {
    await updateUserMutation.mutateAsync({ user: partialUser })
    setLocalUser((p) => ({ ...p, ...partialUser }) as User)
  }

  const loadDBUser = async (id: string) => {
    if (localUser) return

    setIdQuery(id)
  }

  const initUser = async () => {
    const newUserData: User = {
      email: clerkUser?.primaryEmailAddress?.emailAddress || '',
      name: clerkUser?.fullName || '',
      id: userId || '',
      imageUrl: clerkUser?.imageUrl,
      profileBgColor: BG_COLORS[Math.round(Math.random() * BG_COLORS.length - 1)],
      referalCode: shortid.generate(),
      oneSignalId: '',
    }

    await setDBUser(newUserData)
  }

  useEffect(() => {
    if (!idQuery) return

    async function load() {
      const result = await findUserQuery.refetch()
      if (!result.data) {
        initUser()
      } else {
        setLocalUser(result.data as User)
      }
    }

    load()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idQuery])

  useEffect(() => {
    if (!isLoaded || !userId) return

    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user || user.uid !== userId) {
        const token = await getToken({ template: 'integration_firebase' })

        await signInWithCustomToken(auth, token || '')
      }

      if (!localUser) {
        loadDBUser(userId)
        return
      }

      try {
        if (process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID)
          await OneSignal.init({
            appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
            // You can add other initialization options here
            // notifyButton: {
            //   enable: true,
            // },
            // Uncomment the below line to run on localhost. See: https://documentation.onesignal.com/docs/local-testing
            allowLocalhostAsSecureOrigin: true,
          })
      } catch {}

      const newUserData: Partial<User> = {}

      if ((OneSignal.User.onesignalId || '') !== localUser.oneSignalId) {
        newUserData.oneSignalId = OneSignal.User.onesignalId || ''
      }

      if (localUser.imageUrl !== clerkUser?.imageUrl) {
        newUserData.imageUrl = clerkUser?.imageUrl
      }

      if (!isEmpty(newUserData)) {
        await updateDBUser(newUserData)
      }

      if (pathname.includes(ROUTES.APP.INVITE)) {
        const referalCode = pathname.split('/')[3]

        if (referalCode) {
          try {
            await inviteMutation.mutateAsync({ referalCode: referalCode })
          } catch {}
          router.replace(ROUTES.APP.DASHBOARD)
        }
      }

      onFinishLoading?.()
    })

    return () => {
      unSubscribe()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, userId, localUser])
}
/**
 *   }, [isLoaded, userId, localUser])

 */
