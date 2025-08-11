import feature from '@/features'
import { QUERY_KEYS } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export function useGroupDetails() {
  const { id } = useParams<{ id: string }>()

  const groupDetailsQuery = useQuery({
    queryKey: [QUERY_KEYS.GROUPS, 'details', id],
    queryFn: () => feature.group.getGroupDetail(id),
  })

  return { groupDetailsQuery }
}
