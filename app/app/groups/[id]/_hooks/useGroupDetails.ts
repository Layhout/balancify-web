import { QUERY_KEYS, QueryType, ROUTES } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { userAtom } from '@/repositories/user'
import { useAtomValue } from 'jotai'
import { getGroupDetail } from '@/features/group'
import { useMutation } from '@tanstack/react-query'
import { leaveGroup, deleteGroup } from '@/features'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

export function useGroupDetails() {
  const localUser = useAtomValue(userAtom)
  const router = useRouter()
  const queryClient = useQueryClient()

  const { id } = useParams<{ id: string }>()

  const groupDetailsQuery = useQuery({
    queryKey: [QUERY_KEYS.GROUPS, QueryType.Details, localUser?.id, id],
    queryFn: () => getGroupDetail(id),
  })

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

  return { groupDetailsQuery, onEditGroup, onLeaveGroup, id }
}
