import { QUERY_KEYS, QueryType } from '@/lib/constants'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { userAtom } from '@/repositories/user'
import { useAtomValue } from 'jotai'
import { getExpenses } from '@/features/expense'
import { PaginatedResponse, Expense } from '@/types/common'

export function useExpense() {
  const localUser = useAtomValue(userAtom)

  const [search, setSearch] = useState('')

  const queryKey = [QUERY_KEYS.EXPENSES, QueryType.List, localUser?.id, search]

  const expenseQuery = useInfiniteQuery({
    queryKey,
    getNextPageParam: (lastPage: PaginatedResponse<Expense>, allPages: PaginatedResponse<Expense>[]) => {
      const count = lastPage.count
      const totalCount = allPages.flatMap((page) => page.data).length

      if (totalCount >= count) {
        return null
      }

      return lastPage.data.slice().pop()?.createdAt || null
    },
    initialPageParam: null,
    queryFn: ({ pageParam }) => getExpenses({ lastDocCreatedAt: pageParam, search }),
  })

  const expenseData: Expense[] = expenseQuery.data?.pages.flatMap((page) => page.data) || []

  return { expenseQuery, expenseData, setSearch }
}
