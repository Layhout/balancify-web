import { useFieldArray, useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { EXPENSE_ICONS, BG_COLORS } from '@/lib/constants'
import { randomNumBetween } from '@/lib/utils'
import { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/repositories/user'
import { MemberOption, SplitOption } from '@/types/common'

const memberFormSchema = z.object({
  id: z.string(),
  imageUrl: z.string().optional(),
  profileBgColor: z.string(),
  email: z.string(),
  name: z.string(),
  oneSignalId: z.string().optional(),
  referalCode: z.string(),
  amount: z.coerce.number(),
})

const expenseFormSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    amount: z.coerce.number().min(1, 'Amount is required'),
    icon: z.string(),
    iconBgColor: z.string(),
    memberOption: z.nativeEnum(MemberOption),
    splitOption: z.nativeEnum(SplitOption),
    selectedGroup: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .optional(),
    members: z
      .array(memberFormSchema)
      .min(2, 'You need to add at least two members.')
      .max(10, 'Oops! You’ve reached the limit — only 10 members allowed.'),
  })
  .superRefine((data, ctx) => {
    if (data.members.reduce((a, b) => a + b.amount, 0) !== data.amount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['amount'],
        message: 'Amount and members expense amount does not match',
      })
      data.members.forEach((_, i) => {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [`members.${i}.amount`],
          message: '',
        })
      })
    }
  })

export type MemberFormType = z.infer<typeof memberFormSchema>
export type ExpenseFormType = z.infer<typeof expenseFormSchema>

export function useExpenseForm() {
  const localUser = useAtomValue(userAtom)

  const expenseForm = useForm<ExpenseFormType>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      name: '',
      amount: 0,
      icon: '',
      iconBgColor: '',
      memberOption: MemberOption.Group,
      splitOption: SplitOption.PaidEqually,
      selectedGroup: undefined,
      members: [],
    },
  })

  const memberExpenseAmountForm = useFieldArray({
    control: expenseForm.control,
    name: 'members',
    keyName: 'fieldId',
  })

  const [memberOption, amount, splitOption, members] = expenseForm.watch([
    'memberOption',
    'amount',
    'splitOption',
    'members',
  ])

  const onSubmitExpenseForm = (value: ExpenseFormType) => {
    console.log(value)
  }

  useEffect(() => {
    expenseForm.setValue(
      'icon',
      Object.values(EXPENSE_ICONS)[randomNumBetween(0, Object.values(EXPENSE_ICONS).length - 1)],
    )
    expenseForm.setValue('iconBgColor', BG_COLORS[randomNumBetween(0, BG_COLORS.length - 1)])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    expenseForm.setValue('selectedGroup', undefined)
    expenseForm.setValue(
      'members',
      memberOption === MemberOption.Friend && localUser ? [{ ...localUser, amount: 0 }] : [],
    )
    // memberExpenseAmountForm.remove()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberOption])

  useEffect(() => {
    if (!members.length || splitOption === SplitOption.Custom) return

    members.forEach((member, i) => {
      switch (splitOption) {
        case SplitOption.PaidEqually:
          const amountPerMember = amount / members.length
          memberExpenseAmountForm.update(i, { ...member, amount: Number(amountPerMember.toFixed(2)) })
          break

        case SplitOption.PaidByYou:
          if (member.id === localUser?.id) {
            memberExpenseAmountForm.update(i, { ...member, amount: 0 })
          } else {
            memberExpenseAmountForm.update(i, { ...member, amount })
          }
          break

        case SplitOption.PaidByThem:
          const amountPerMemberWithoutYou = amount / (members.length - 1)
          if (member.id === localUser?.id) {
            memberExpenseAmountForm.update(i, { ...member, amount: Number(amountPerMemberWithoutYou.toFixed(2)) })
          } else {
            memberExpenseAmountForm.update(i, { ...member, amount: 0 })
          }
          break

        default:
          break
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members.length, amount, splitOption])

  console.count('useExpenseForm')

  return {
    expenseForm,
    memberExpenseAmountForm,
    onSubmitExpenseForm,
  }
}
