import { QUERY_KEYS } from '@/lib/constants'
import services from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export default function useGroupDetails(id: string) {
  const { isPending, data: groupDetailsRes } = useQuery({
    queryKey: [QUERY_KEYS.GROUPS, 'details', id],
    queryFn: () => services.group.getGroup(),
  })

  const groupDetailsData = useMemo(() => groupDetailsRes?.data, [groupDetailsRes?.data])

  return { isPending, groupDetailsData }
}
