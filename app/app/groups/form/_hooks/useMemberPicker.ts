import { QUERY_KEYS, QueryType } from '@/lib/constants'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getFriends } from '@/features'
import { userAtom } from '@/repositories/user'
import { useAtomValue } from 'jotai'

export function useMemberPicker() {
  const localUser = useAtomValue(userAtom)

  const [searchFriend, setSearchFriend] = useState('')

  const queryKey = [QUERY_KEYS.FRIENDS, QueryType.Search, localUser?.id, searchFriend]

  const friendQuery = useQuery({
    queryKey,
    queryFn: () => getFriends({ lastDocCreatedAt: null, search: searchFriend }),
    enabled: !!searchFriend,
    placeholderData: keepPreviousData,
  })

  return { setSearchFriend, friendQuery }
}
