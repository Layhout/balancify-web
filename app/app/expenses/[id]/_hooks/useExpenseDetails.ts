import { QUERY_KEYS } from '@/lib/constants'
import services from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export default function useExpenseDetails(id: string) {
  const { isPending, data: expenseDetailsRes } = useQuery({
    queryKey: [QUERY_KEYS.EXPENSES, 'details', id],
    queryFn: () => services.expense.getExpense(),
  })

  const expenseDetailsData = useMemo(() => expenseDetailsRes?.data, [expenseDetailsRes?.data])

  return { isPending, expenseDetailsData }
}
