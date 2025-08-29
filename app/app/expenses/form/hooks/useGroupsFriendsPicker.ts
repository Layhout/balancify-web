import { QUERY_KEYS, QueryType } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getFriends, getGroups } from '@/features'
import { userAtom } from '@/repositories/user'
import { useAtomValue } from 'jotai'
import { FriendResponse, Group, PaginatedResponse } from '@/types/common'
import { useQueryClient } from '@tanstack/react-query'

export function useGroupsFriendsPicker({ mode }: { mode: 'group' | 'friend' }) {
  const localUser = useAtomValue(userAtom)
  const queryClient = useQueryClient()

  const [searchValue, setSearchValue] = useState('')

  const queryKey = [QUERY_KEYS.GROUPS_FRIENDS, QueryType.Search, mode, localUser?.id, searchValue]

  const foundQuery = useQuery({
    queryKey,
    queryFn: (): Promise<PaginatedResponse<Group | FriendResponse>> => {
      if (mode === 'group') {
        return getGroups({ lastDocCreatedAt: null, search: searchValue })
      }

      return getFriends({ lastDocCreatedAt: null, search: searchValue })
    },
    enabled: !!searchValue,
  })

  useEffect(() => {
    queryClient.setQueryData(queryKey, { data: [], count: 0 })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  return { setSearchValue, foundQuery }
}
