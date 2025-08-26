import { QUERY_KEYS, QueryType } from '@/lib/constants'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getFriends, getGroups } from '@/features'
import { userAtom } from '@/repositories/user'
import { useAtomValue } from 'jotai'
import { FriendResponse, Group, PaginatedResponse } from '@/types/common'

export function useGroupsFriendsPicker({ mode }: { mode: 'group' | 'friend' }) {
  const localUser = useAtomValue(userAtom)

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
    placeholderData: keepPreviousData,
  })

  return { setSearchValue, foundQuery }
}
