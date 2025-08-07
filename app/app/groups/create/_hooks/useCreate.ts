import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const createGroupFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  members: z
    .array(
      z.object({
        userId: z.string(),
        name: z.string(),
        imageUrl: z.string().optional(),
        profileBgColor: z.string(),
      }),
    )
    .min(1, 'Member is required'),
})

export type CreateGroupFormType = z.infer<typeof createGroupFormSchema>

export function useCreate() {
  const createGroupForm = useForm<CreateGroupFormType>({
    resolver: zodResolver(createGroupFormSchema),
    defaultValues: {
      name: '',
      description: '',
      members: [],
    },
  })

  const onSubmitCreateGroupForm = (value: CreateGroupFormType) => {
    console.log(value)
  }

  return { createGroupForm, onSubmitCreateGroupForm }
}
