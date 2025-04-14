import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/lib/constants'
import { services } from '@/services'

export function useDashboard() {
  const { isPending, data: dashboardRes } = useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD, 'list'],
    queryFn: services.dashboard.getDashboard,
  })

  const dashboardData = useMemo(() => dashboardRes?.data, [dashboardRes?.data])

  return { isPending, dashboardData }
}
