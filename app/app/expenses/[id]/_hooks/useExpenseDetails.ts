import { QUERY_KEYS, QueryType } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
import { userAtom } from '@/repositories/user'
import { useAtomValue } from 'jotai'
import { useParams } from 'next/navigation'
import { getExpenseDetail } from '@/features'

export function useExpenseDetails() {
  const localUser = useAtomValue(userAtom)

  const { id } = useParams<{ id: string }>()

  const expenseDetailsQuery = useQuery({
    queryKey: [QUERY_KEYS.EXPENSES, QueryType.Details, localUser?.id, id],
    queryFn: () => getExpenseDetail(id),
  })

  return { expenseDetailsQuery }
}
