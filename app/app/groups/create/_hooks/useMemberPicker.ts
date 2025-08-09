import { QUERY_KEYS } from '@/lib/constants'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import feature from '@/features'

export function useMemberPicker() {
  const [searchFriend, setSearchFriend] = useState('')

  const queryKey = [QUERY_KEYS.FRIENDS, 'list', searchFriend]

  const friendQuery = useQuery({
    queryKey,
    queryFn: () => feature.friend.getFriends({ lastDocCreatedAt: null, search: searchFriend }),
    enabled: !!searchFriend,
    placeholderData: keepPreviousData,
  })

  return { setSearchFriend, friendQuery }
}
