import { countPerPage, FRIEND_REQUEST_MSG, QUERY_KEYS, YOURSELF_AS_FRIEND_MSG } from '@/lib/constants'
import { keepPreviousData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import feature from '@/features'
import { useState } from 'react'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/repositories/user'
import { toast } from 'sonner'
import { randomNumBetween } from '@/lib/utils'
import { FriendResponse, FriendStatusEnum, PaginatedResponse } from '@/types/common'

const addFriendFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
})

export type AddFriendFromType = z.infer<typeof addFriendFormSchema>

export function useFriend() {
  const localUser = useAtomValue(userAtom)
  const queryClient = useQueryClient()

  const [openAddFriendDialog, setOpenAddFriendDialog] = useState(false)
  const [openInvitionDialog, setOpenInvitionDialog] = useState(false)
  const [search, setSearch] = useState('')

  const queryKey = [QUERY_KEYS.FRIENDS, 'list', localUser?.id, search]

  const friendQuery = useInfiniteQuery({
    queryKey,
    getNextPageParam: (lastPage: PaginatedResponse<FriendResponse>, allPages: PaginatedResponse<FriendResponse>[]) => {
      const count = lastPage.count
      const totalCount = allPages.flatMap(page => page.data).length

      if (totalCount >= count) {
        return null
      }

      return lastPage.data.slice().pop()?.createdAt || null
    },
    initialPageParam: null,
    queryFn: ({ pageParam }) => feature.friend.getFriends({ lastDocCreatedAt: pageParam, search }),
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
    const pageIndex = friendQuery.data?.pages.findIndex((page) => page.data.some((f) => f.id === friendId))
    const friendIndexInPage = friendQuery.data?.pages[pageIndex!].data.findIndex((f) => f.id === friendId)
    const friend = friendQuery.data?.pages[pageIndex!].data[friendIndexInPage!]

    friend!.status = status

    queryClient.setQueryData(queryKey, {
      ...friendQuery.data,
      pages: friendQuery.data?.pages.map((page, i) => {
        if (i === pageIndex) {
          return {
            ...page,
            data: page.data.map((f, j) => (j === friendIndexInPage ? friend : f)),
          }
        }
        return page
      }),

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

  const totalPage = friendQuery.data ? Math.ceil((friendQuery.data.pages[0]?.count || 0) / countPerPage) : 1

  const friendData: FriendResponse[] = friendQuery.data?.pages.flatMap((page) => page.data) || []

  return {
    friendQuery,
    friendData,
    addFriendForm,
    openAddFriendDialog,
    isAddingFriend: addFriendMutation.isPending,
    openInvitionDialog,
    totalPage,
    acceptFriendMutation,
    rejectFriendMutation,
    onSubmitFriendForm,
    setOpenAddFriendDialog,
    setOpenInvitionDialog,
    setSearch,
  }
}
