import feature from '@/features'
import { QUERY_KEYS } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { userAtom } from '@/repositories/user'
import { useAtomValue } from 'jotai'

export function useGroupDetails() {
  const localUser = useAtomValue(userAtom)

  const { id } = useParams<{ id: string }>()

  const groupDetailsQuery = useQuery({
    queryKey: [QUERY_KEYS.GROUPS, 'details', localUser?.id, id],
    queryFn: () => feature.group.getGroupDetail(id),
  })

  return { groupDetailsQuery }
}
