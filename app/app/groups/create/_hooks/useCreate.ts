import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import feature from '@/features'
import { useRouter } from 'next/navigation'

const memberFormSchema = z.object({
  userId: z.string(),
  name: z.string(),
  imageUrl: z.string().optional(),
  profileBgColor: z.string(),
  email: z.string(),
})

const createGroupFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  members: z.array(memberFormSchema).min(1, 'Member is required'),
})

export type MemberFormType = z.infer<typeof memberFormSchema>
export type CreateGroupFormType = z.infer<typeof createGroupFormSchema>

export function useCreate() {
  const router = useRouter()

  const createGroupMutation = useMutation({
    mutationFn: feature.group.createGroup,
    onSuccess: () => {
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
        userId: member.userId,
        name: member.name,
      })),
    })
  }

  return { createGroupForm, onSubmitCreateGroupForm, isSubmitting: createGroupMutation.isPending }
}
