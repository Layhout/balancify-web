import { QUERY_KEYS, QueryType } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
import { userAtom } from '@/repositories/user'
import { useAtomValue } from 'jotai'
import { useParams } from 'next/navigation'
import { getExpenseDetail } from '@/features'
import { useMutation } from '@tanstack/react-query'
import { deleteExpense, settleExpense } from '@/features'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { Expense } from '@/types/common'

export function useExpenseDetails() {
  const localUser = useAtomValue(userAtom)
  const router = useRouter()
  const queryClient = useQueryClient()

  const { id } = useParams<{ id: string }>()

  const queryKey = [QUERY_KEYS.EXPENSES, QueryType.Details, localUser?.id, id]

  const expenseDetailsQuery = useQuery({
    queryKey,
    queryFn: () => getExpenseDetail(id),
  })

  const amount = expenseDetailsQuery.data?.member[localUser?.id || ''].amount || 0
  const settledAmount = expenseDetailsQuery.data?.member[localUser?.id || ''].settledAmount || 0
  const amountToSettle = amount - settledAmount
  const hasSettled = amountToSettle === 0

  const deleteExpenseMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSES, QueryType.List, localUser?.id],
      })
      router.back()
    },
  })

  const settleExpenseMutation = useMutation({
    mutationFn: settleExpense,
    onSuccess: (_, variable) => {
      queryClient.setQueryData(queryKey, (oldData: Expense | null) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          member: {
            ...oldData.member,
            [localUser!.id]: {
              ...oldData.member[localUser!.id],
              settledAmount: variable.amount,
            },
          },
        }
      })
    },
  })

  const onSettleExpense = (amount: number) => {
    settleExpenseMutation.mutate({ id, amount, receiverName: expenseDetailsQuery.data?.paidBy.name || '' })
  }

  return {
    expenseDetailsQuery,
    isOwner: expenseDetailsQuery.data?.createdBy.id === localUser?.id,
    onDelete: () => deleteExpenseMutation.mutate({ id }),
    onSettleExpense,
    hasSettled,
    amountToSettle,
    isSettling: settleExpenseMutation.isPending,
  }
}
