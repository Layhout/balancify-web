import { QUERY_KEYS } from '@/lib/constants'
import { useMutation, useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import feature from '@/features'
import { useState } from 'react'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/repositories/user'
import { toast } from 'sonner'

const addFriendFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
})

export type AddFriendFromType = z.infer<typeof addFriendFormSchema>

export function useFriend() {
  const localUser = useAtomValue(userAtom)

  const [openAddFriendDialog, setOpenAddFriendDialog] = useState(false)
  const [openInvitionDialog, setOpenInvitionDialog] = useState(false)

  const friendQuery = useQuery({
    queryKey: [QUERY_KEYS.FRIENDS, 'list'],
    queryFn: () => {
      return []
    },
  })

  const mutation = useMutation({
    mutationFn: feature.friend.addFriendToUserByEmail,
    onSuccess: () => {
      toast('A friend request was sent.')
    },
    onError: () => {
      setOpenAddFriendDialog(false)
      setOpenInvitionDialog(true)
    },
  })

  const addFriendForm = useForm<AddFriendFromType>({
    resolver: zodResolver(addFriendFormSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmitFriendForm(values: AddFriendFromType) {
    if (localUser?.email === values.email) {
      addFriendForm.setError('email', { message: 'Cannot add yourself as friend.' }, { shouldFocus: true })
      return
    }

    mutation.mutate({ userId: localUser!.id, friendEmail: values.email, username: localUser?.name || '' })
  }

  return {
    friendQuery,
    addFriendForm,
    onSubmitFriendForm,
    openAddFriendDialog,
    setOpenAddFriendDialog,
    isAddingFriend: mutation.isPending,
    openInvitionDialog,
    setOpenInvitionDialog,
  }
}
