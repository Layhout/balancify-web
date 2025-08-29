import { useFieldArray, useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { EXPENSE_ICONS, BG_COLORS } from '@/lib/constants'
import { randomNumBetween } from '@/lib/utils'
import { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/repositories/user'
import { ExpenseMember, MemberOption, SplitOption } from '@/types/common'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { QUERY_KEYS, QueryType } from '@/lib/constants'
import { createExpense } from '@/features'

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
    if (data.members.reduce((p, c) => p + c.amount, 0) !== data.amount) {
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

  const queryClient = useQueryClient()
  const router = useRouter()

  const expenseMutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSES, QueryType.List, localUser?.id],
      })

      router.back()
    },
  })

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
    expenseMutation.mutate({
      name: value.name,
      amount: value.amount,
      icon: value.icon,
      iconBgColor: value.iconBgColor,
      memberOption: value.memberOption,
      splitOption: value.splitOption,
      group: value.selectedGroup,
      members: value.members.map<ExpenseMember>((m) => ({
        amount: m.amount,
        id: m.id,
        imageUrl: m.imageUrl,
        profileBgColor: m.profileBgColor,
        email: m.email,
        name: m.name,
        oneSignalId: m.oneSignalId || '',
        referalCode: m.referalCode,
        settledAmount: 0,
      })),
    })
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberOption])

  useEffect(() => {
    if (!members.length || splitOption === SplitOption.Custom) return

    const memberAmounts = members.map((member) => {
      switch (splitOption) {
        case SplitOption.PaidEqually:
          const amountPerMember = Number((amount / members.length).toFixed(2))
          return amountPerMember

        case SplitOption.PaidByYou:
          const amountPerMemberWithoutYou = Number((amount / (members.length - 1)).toFixed(2))
          if (member.id === localUser?.id) {
            return 0
          } else {
            return amountPerMemberWithoutYou
          }

        case SplitOption.PaidByThem:
          if (member.id === localUser?.id) {
            return amount
          } else {
            return 0
          }

        default:
          return 0
      }
    })

    const remainingAmount = Number((amount - memberAmounts.reduce((p, c) => p + c, 0)).toFixed(2))

    if (remainingAmount) {
      memberAmounts[members.length - 1] += remainingAmount
    }

    memberAmounts.forEach((amount, i) => {
      memberExpenseAmountForm.update(i, { ...memberExpenseAmountForm.fields[i], amount })
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members.length, amount, splitOption])

  useEffect(() => {
    console.log(members)
  }, [members])

  return {
    expenseForm,
    memberExpenseAmountForm,
    onSubmitExpenseForm,
  }
}
