import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS, QueryType } from '@/lib/constants'
import { services } from '@/services'
import { userAtom } from '@/repositories/user'
import { useAtomValue } from 'jotai'

export function useDashboard() {
  const localUser = useAtomValue(userAtom)

  const { isPending, data: dashboardRes } = useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD, QueryType.List, localUser?.id],
    queryFn: services.dashboard.getDashboard,
  })

  const dashboardData = useMemo(() => dashboardRes?.data, [dashboardRes?.data])

  return { isPending, dashboardData }
}
