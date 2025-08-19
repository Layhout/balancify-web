import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { QUERY_KEYS } from '@/lib/constants'
import { userAtom } from '@/repositories/user'
import { useAtomValue } from 'jotai'
import { createGroup } from '@/features/group'

const memberFormSchema = z.object({
  id: z.string(),
  imageUrl: z.string().optional(),
  profileBgColor: z.string(),
  email: z.string(),
  name: z.string(),
  oneSignalId: z.string().optional(),
  referalCode: z.string(),
})

const groupFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  members: z
    .array(memberFormSchema)
    .min(1, 'You need to add at least one member.')
    .max(10, 'Oops! You’ve reached the limit — only 10 members allowed.'),
})

export type MemberFormType = z.infer<typeof memberFormSchema>
export type GroupFormType = z.infer<typeof groupFormSchema>

export function useGroupForm() {
  const localUser = useAtomValue(userAtom)

  const router = useRouter()
  const queryClient = useQueryClient()

  const groupMutation = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUPS, 'list', localUser?.id],
      })
      router.back()
    },
  })

  const groupForm = useForm<GroupFormType>({
    resolver: zodResolver(groupFormSchema),
    defaultValues: {
      name: '',
      description: '',
      members: [],
    },
  })

  const onSubmitGroupForm = (value: GroupFormType) => {
    groupMutation.mutate({
      name: value.name,
      description: value.description,
      members: value.members.map((member) => ({
        id: member.id,
        name: member.name,
        profileBgColor: member.profileBgColor,
        imageUrl: member.imageUrl,
        email: member.email,
        oneSignalId: member.oneSignalId || '',
        referalCode: member.referalCode,
      })),
    })
  }

  return {
    groupForm,
    onSubmitGroupForm,
    isSubmitting: groupMutation.isPending,
  }
}
