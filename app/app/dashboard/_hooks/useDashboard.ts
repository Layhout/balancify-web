import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS, QueryType } from '@/lib/constants'
import { userAtom } from '@/repositories/user'
import { useAtomValue } from 'jotai'
import { getDashboardData } from '@/features/dashboard'

export function useDashboard() {
  const localUser = useAtomValue(userAtom)

  const dashboardQuery = useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD, QueryType.Details, localUser?.id],
    queryFn: () => getDashboardData(),
  })

  return { dashboardQuery }
}
