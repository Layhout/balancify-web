'use client'

import { QUERY_KEYS } from '@/lib/constants'
import services from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export default function useGroup() {
  const { isPending, data: groupRes } = useQuery({
    queryKey: [QUERY_KEYS.GROUPS, 'list'],
    queryFn: services.group.getGroups,
  })

  const groupData = useMemo(() => groupRes?.data || [], [groupRes?.data])

  return { isPending, groupData }
}
