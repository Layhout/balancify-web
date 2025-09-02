import { QUERY_KEYS, QueryType } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
import { userAtom } from '@/repositories/user'
import { useAtomValue } from 'jotai'
import { useParams } from 'next/navigation'
import { getExpenseDetail } from '@/features'
import { useMutation } from '@tanstack/react-query'
import { deleteExpense } from '@/features'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

export function useExpenseDetails() {
  const localUser = useAtomValue(userAtom)
  const router = useRouter()
  const queryClient = useQueryClient()

  const { id } = useParams<{ id: string }>()

  const expenseDetailsQuery = useQuery({
    queryKey: [QUERY_KEYS.EXPENSES, QueryType.Details, localUser?.id, id],
    queryFn: () => getExpenseDetail(id),
  })

  const deleteExpenseMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSES, QueryType.List, localUser?.id],
      })
      router.back()
    },
  })

  return {
    expenseDetailsQuery,
    isOwner: expenseDetailsQuery.data?.createdBy.id === localUser?.id,
    onDelete: () => deleteExpenseMutation.mutate({ id }),
  }
}
