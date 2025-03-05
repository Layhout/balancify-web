import { QUERY_KEYS } from '@/lib/constants'
import services from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export default function useExpense() {
  const { isPending, data: expenseRes } = useQuery({
    queryKey: [QUERY_KEYS.EXPENSES, 'list'],
    queryFn: services.expense.getExpenses,
  })

  const expenseData = useMemo(() => expenseRes?.data || [], [expenseRes?.data])

  return { isPending, expenseData }
}
