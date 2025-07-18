import { countPerPage, FRIEND_REQUEST_MSG, QUERY_KEYS, YOURSELF_AS_FRIEND_MSG } from '@/lib/constants'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import feature from '@/features'
import { useState } from 'react'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/repositories/user'
import { toast } from 'sonner'
import { randomNumBetween } from '@/lib/utils'
import { Friend, FriendStatusEnum } from '@/types/common'

const addFriendFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
})

export type AddFriendFromType = z.infer<typeof addFriendFormSchema>

export function useFriend() {
  const localUser = useAtomValue(userAtom)
  const queryClient = useQueryClient()

  const [openAddFriendDialog, setOpenAddFriendDialog] = useState(false)
  const [openInvitionDialog, setOpenInvitionDialog] = useState(false)
  const [page, setPage] = useState(0)
  const [lastFriendDocCreatedAt, setLastFriendDocCreatedAt] = useState<Friend['createdAt'] | null>(null)
  const [search, setSearch] = useState('')

  const queryKey = [QUERY_KEYS.FRIENDS, 'list', localUser?.id, page, search]

  const friendQuery = useQuery({
    queryKey,
    queryFn: () => feature.friend.getFriends({ lastDocCreatedAt: lastFriendDocCreatedAt, search }),
    placeholderData: keepPreviousData,
  })

  const addFriendMutation = useMutation({
    mutationFn: feature.friend.addFriendToUserByEmail,
    onSuccess: () => {
      toast(FRIEND_REQUEST_MSG[randomNumBetween(0, FRIEND_REQUEST_MSG.length - 1)])
      queryClient.invalidateQueries({ queryKey })
    },
    onError: () => {
      setOpenAddFriendDialog(false)
      setOpenInvitionDialog(true)
    },
  })

  const acceptFriendMutation = useMutation({
    mutationFn: feature.friend.acceptFriendRequest,
    onSuccess: (_, variable) => {
      updateLocalFriendList(variable.friendId, FriendStatusEnum.Accepted)
    },
  })

  const rejectFriendMutation = useMutation({
    mutationFn: feature.friend.rejectFriendRequest,
    onSuccess: (_, variable) => {
      updateLocalFriendList(variable.friendId, FriendStatusEnum.Rejected)
    },
  })

  const updateLocalFriendList = (friendId: string, status: FriendStatusEnum) => {
    const updatedFriendIndex = friendQuery.data?.data.findIndex((f) => f.id === friendId)
    const updatedFriend = friendQuery.data?.data[updatedFriendIndex!]
    updatedFriend!.status = status

    queryClient.setQueryData(queryKey, {
      ...friendQuery.data,
      data: friendQuery.data?.data.map((f, i) => (i === updatedFriendIndex ? updatedFriend : f)),
    })
  }

  const addFriendForm = useForm<AddFriendFromType>({
    resolver: zodResolver(addFriendFormSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmitFriendForm = async (value: AddFriendFromType) => {
    if (localUser?.email === value.email) {
      addFriendForm.setError(
        'email',
        { message: YOURSELF_AS_FRIEND_MSG[randomNumBetween(0, YOURSELF_AS_FRIEND_MSG.length - 1)] },
        { shouldFocus: true },
      )
      return
    }

    addFriendMutation.mutate({ friendEmail: value.email })
    setOpenAddFriendDialog(false)
  }

  const totalPage = friendQuery.data ? Math.ceil((friendQuery.data.count || 0) / countPerPage) : 1

  const goNextPage = () => {
    if (page + 1 === totalPage) return

    const nextPage = page + 1

    const lastDoc = friendQuery.data?.data[nextPage * countPerPage - 1]

    if (!lastDoc) return

    setLastFriendDocCreatedAt(lastDoc.createdAt)

    setPage(nextPage)
  }

  const goPrevPage = () => {
    if (!page) return

    const nextPage = page - 1

    if (!nextPage) {
      setLastFriendDocCreatedAt(null)
      setPage(nextPage)
      return
    }

    const lastDoc = friendQuery.data?.data[nextPage * countPerPage - 1]

    if (!lastDoc) return

    setLastFriendDocCreatedAt(lastDoc.createdAt)

    setPage(nextPage)
  }

  return {
    friendQuery,
    addFriendForm,
    openAddFriendDialog,
    isAddingFriend: addFriendMutation.isPending,
    openInvitionDialog,
    page,
    totalPage,
    acceptFriendMutation,
    rejectFriendMutation,
    onSubmitFriendForm,
    setOpenAddFriendDialog,
    setOpenInvitionDialog,
    goNextPage,
    goPrevPage,
    setSearch,
  }
}
