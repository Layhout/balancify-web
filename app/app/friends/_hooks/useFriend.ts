import { QUERY_KEYS } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
import { friend } from '@/features'

export function useFriend() {
  const { isPending, data: friends } = useQuery({
    queryKey: [QUERY_KEYS.FRIENDS, 'list'],
    queryFn: friend.getFriends,
  })

  return { isPending, friends }
}
