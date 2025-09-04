import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { QUERY_KEYS, QueryType } from '@/lib/constants'
import { userAtom } from '@/repositories/user'
import { useAtomValue } from 'jotai'
import { createGroup, editGroup, getGroupDetail } from '@/features'
import { useEffect } from 'react'
import { toast } from 'sonner'

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
  const searchParams = useSearchParams()

  const groupDetailsQuery = useQuery({
    queryKey: [QUERY_KEYS.GROUPS, QueryType.Details, localUser?.id, searchParams.get('edit')],
    queryFn: () => getGroupDetail(searchParams.get('edit') || ''),
    enabled: !!searchParams.get('edit'),
  })

  const groupMutation = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUPS, QueryType.List, localUser?.id],
      })

      router.back()
    },
  })

  const editGroupMutation = useMutation({
    mutationFn: editGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUPS, QueryType.Details, localUser?.id, searchParams.get('edit')],
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
    const data = {
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
    }

    if (searchParams.get('edit')) {
      if (!groupDetailsQuery.data) {
        toast('Cannot find group to edit.')
        return
      }

      editGroupMutation.mutate({
        id: searchParams.get('edit') || '',
        ...data,
      })
      return
    }

    groupMutation.mutate(data)
  }

  useEffect(() => {
    if (groupDetailsQuery.data) {
      groupForm.reset({
        name: groupDetailsQuery.data.name,
        description: groupDetailsQuery.data.description,
        members: groupDetailsQuery.data.members,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupDetailsQuery.data])

  return {
    groupForm,
    onSubmitGroupForm,
    isSubmitting: groupMutation.isPending,
    isEdit: !!searchParams.get('edit'),
  }
}
