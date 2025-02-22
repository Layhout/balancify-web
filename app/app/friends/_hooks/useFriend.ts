import { QUERY_KEYS } from '@/lib/constants'
import services from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export default function useFriend() {
  const { isPending, data: friendRes } = useQuery({
    queryKey: [QUERY_KEYS.FRIENDS, 'list'],
    queryFn: () => services.Friend.getFriends(),
  })

  const friendData = useMemo(() => friendRes?.data || [], [friendRes?.data])

  return { isPending, friendData }
}
