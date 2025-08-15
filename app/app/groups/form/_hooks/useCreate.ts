import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import feature from '@/features'
import { useRouter } from 'next/navigation'
import { QUERY_KEYS } from '@/lib/constants'
import { userAtom } from '@/repositories/user'
import { useAtomValue } from 'jotai'

const memberFormSchema = z.object({
  id: z.string(),
  imageUrl: z.string().optional(),
  profileBgColor: z.string(),
  email: z.string(),
  name: z.string(),
  oneSignalId: z.string().optional(),
  referalCode: z.string(),
})

const createGroupFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  members: z
    .array(memberFormSchema)
    .min(1, 'You need to add at least one member.')
    .max(10, 'Oops! You’ve reached the limit — only 10 members allowed.'),
})

export type MemberFormType = z.infer<typeof memberFormSchema>
export type CreateGroupFormType = z.infer<typeof createGroupFormSchema>

export function useCreate() {
  const localUser = useAtomValue(userAtom)

  const router = useRouter()
  const queryClient = useQueryClient()

  const createGroupMutation = useMutation({
    mutationFn: feature.group.createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUPS, 'list', localUser?.id],
      })
      router.back()
    },
  })

  const createGroupForm = useForm<CreateGroupFormType>({
    resolver: zodResolver(createGroupFormSchema),
    defaultValues: {
      name: '',
      description: '',
      members: [],
    },
  })

  const onSubmitCreateGroupForm = (value: CreateGroupFormType) => {
    createGroupMutation.mutate({
      name: value.name,
      description: value.description,
      members: value.members.map((member) => ({
        id: member.id,
        name: member.name,
        profileBgColor: member.profileBgColor,
        imageUrl: member.imageUrl,
        email: member.email,
        oneSignalId: member.oneSignalId,
        referalCode: member.referalCode,
      })),
    })
  }

  return { createGroupForm, onSubmitCreateGroupForm, isSubmitting: createGroupMutation.isPending }
}
