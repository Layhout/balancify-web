import { QUERY_KEYS } from '@/lib/constants'
import { services } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useFriend() {
  const { isPending, data: friendRes } = useQuery({
    queryKey: [QUERY_KEYS.FRIENDS, 'list'],
    queryFn: services.friend.getFriends,
  })

  const friendData = useMemo(() => friendRes?.data || [], [friendRes?.data])

  return { isPending, friendData }
}
