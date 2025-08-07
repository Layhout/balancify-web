import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { MemberFormType } from './useCreate'

const findMemberFormSchema = z.object({
  email: z.string().email(),
})

type FindMemberFormType = z.infer<typeof findMemberFormSchema>

export function useMemberPicker(onChange?: (member: MemberFormType[]) => void) {
  const [pickedMember, setPickedMember] = useState<MemberFormType[]>([])

  const findMemberForm = useForm<FindMemberFormType>({
    resolver: zodResolver(findMemberFormSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmitFindMemberForm = (value: FindMemberFormType) => {
    console.log(value)
  }

  useEffect(() => {
    onChange?.(pickedMember)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickedMember])

  return { findMemberForm, onSubmitFindMemberForm, pickedMember, setPickedMember }
}
