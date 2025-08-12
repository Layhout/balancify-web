import { QUERY_KEYS } from '@/lib/constants'
import { services } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { userAtom } from '@/repositories/user'
import { useAtomValue } from 'jotai'

export function useExpenseDetails(id: string) {
  const localUser = useAtomValue(userAtom)

  const { isPending, data: expenseDetailsRes } = useQuery({
    queryKey: [QUERY_KEYS.EXPENSES, 'details', localUser?.id, id],
    queryFn: services.expense.getExpense,
  })

  const expenseDetailsData = useMemo(() => expenseDetailsRes?.data, [expenseDetailsRes?.data])

  return { isPending, expenseDetailsData }
}
