import feature from '@/features'
import { QUERY_KEYS } from '@/lib/constants'
import { userAtom } from '@/repositories/user'
import { User } from '@/types/common'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import { useEffect, useState } from 'react'

export const useClientAuth = () => {
  const [localUser, setLocalUser] = useAtom(userAtom)

  const [idQuery, setIdQuery] = useState('')

  const createUserMutation = useMutation({
    mutationFn: feature.user.createUser,
  })

  const updateUserMutation = useMutation({
    mutationFn: feature.user.updateUser,
  })

  const findUserQuery = useQuery({
    queryKey: [QUERY_KEYS.USER, 'search', idQuery],
    queryFn: () => feature.user.findUserById(idQuery),
    enabled: false,
  })

  const clearClientUser = () => {
    setLocalUser(RESET)
  }

  const setDBUser = async (user: User) => {
    await createUserMutation.mutateAsync(user)
    setLocalUser(user)
  }

  const updateDBUser = async (id: string, partialUser: Partial<User>) => {
    await updateUserMutation.mutateAsync({ id, user: partialUser })
    setLocalUser((p) => ({ ...p, ...partialUser }) as User)
  }

  const loadDBUser = async (id: string) => {
    if (localUser) return

    setIdQuery(id)
  }

  useEffect(() => {
    if (!idQuery) return

    async function load() {
      const result = await findUserQuery.refetch()
      setLocalUser(result.data as User)
    }

    load()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idQuery])

  return { clearClientUser, setDBUser, updateDBUser, localUser, loadDBUser }
}
