import { QUERY_KEYS } from '@/lib/constants'
import { services } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { userAtom } from '@/repositories/user'
import { useAtomValue } from 'jotai'

export function useExpense() {
  const localUser = useAtomValue(userAtom)

  const { isPending, data: expenseRes } = useQuery({
    queryKey: [QUERY_KEYS.EXPENSES, 'list', localUser?.id],
    queryFn: services.expense.getExpenses,
  })

  const expenseData = useMemo(() => expenseRes?.data || [], [expenseRes?.data])

  return { isPending, expenseData }
}
