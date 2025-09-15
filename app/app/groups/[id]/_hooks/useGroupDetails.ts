import { QUERY_KEYS, QueryType, ROUTES } from '@/lib/constants'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { userAtom } from '@/repositories/user'
import { useAtomValue } from 'jotai'
import { getGroupDetail } from '@/features/group'
import { useMutation } from '@tanstack/react-query'
import { leaveGroup, deleteGroup, getExpenseForGroup } from '@/features'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { Expense, PaginatedResponse } from '@/types/common'

export function useGroupDetails() {
  const localUser = useAtomValue(userAtom)
  const router = useRouter()
  const queryClient = useQueryClient()

  const { id } = useParams<{ id: string }>()

  const groupDetailsQuery = useQuery({
    queryKey: [QUERY_KEYS.GROUPS, QueryType.Details, localUser?.id, id],
    queryFn: () => getGroupDetail(id),
  })

  const expenseQuery = useInfiniteQuery({
    queryKey: [QUERY_KEYS.EXPENSES, QueryType.List, localUser?.id, id],
    getNextPageParam: (lastPage: PaginatedResponse<Expense>, allPages: PaginatedResponse<Expense>[]) => {
      const count = lastPage.count
      const totalCount = allPages.flatMap((page) => page.data).length

      if (totalCount >= count) {
        return null
      }

      return lastPage.data.slice().pop()?.createdAt || null
    },
    initialPageParam: null,
    queryFn: ({ pageParam }) => getExpenseForGroup({ lastDocCreatedAt: pageParam, id }),
  })

  const expenseData: Expense[] = expenseQuery.data?.pages.flatMap((page) => page.data) || []

  const handleBack = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.GROUPS, QueryType.List, localUser?.id],
    })
    router.back()
  }

  const leaveGroupMutation = useMutation({
    mutationFn: leaveGroup,
    onSuccess: handleBack,
  })

  const deleteGroupMutation = useMutation({
    mutationFn: deleteGroup,
    onSuccess: handleBack,
  })

  const onEditGroup = () => {
    router.push(`${ROUTES.APP.GROUPS_FORM}?edit=${id}`)
  }

  const onLeaveGroup = () => {
    if (groupDetailsQuery.data?.members.length === 2) {
      deleteGroupMutation.mutate({ id })
      return
    }

    leaveGroupMutation.mutate({ id })
  }

  return { groupDetailsQuery, onEditGroup, onLeaveGroup, id, expenseData, expenseQuery }
}
