import { useFieldArray, useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { EXPENSE_ICONS, BG_COLORS } from '@/lib/constants'
import { randomNumBetween } from '@/lib/utils'
import { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/repositories/user'
import { ExpenseMember, MemberOption, SplitOption, User } from '@/types/common'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { QUERY_KEYS, QueryType } from '@/lib/constants'
import { createExpense, editExpense, getExpenseDetail, getGroupDetail } from '@/features'
import { toast } from 'sonner'

const memberFormSchema = z.object({
  id: z.string(),
  imageUrl: z.string().optional(),
  profileBgColor: z.string(),
  email: z.string(),
  name: z.string(),
  notiToken: z.string(),
  referalCode: z.string(),
  amount: z.coerce.number(),
  settledAmount: z.number(),
})

const expenseFormSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    amount: z.coerce.number().min(1, 'Amount is required'),
    icon: z.string(),
    iconBgColor: z.string(),
    memberOption: z.nativeEnum(MemberOption),
    splitOption: z.nativeEnum(SplitOption),
    paidBy: memberFormSchema.omit({ amount: true, settledAmount: true }).optional(),
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
  const searchParams = useSearchParams()

  const expenseDetailsQuery = useQuery({
    queryKey: [QUERY_KEYS.EXPENSES, QueryType.Details, localUser?.id, searchParams.get('edit')],
    queryFn: () => getExpenseDetail(searchParams.get('edit') || ''),
    enabled: !!searchParams.get('edit'),
  })

  const groupDetailQuery = useQuery({
    queryKey: [QUERY_KEYS.GROUPS, QueryType.Details, localUser?.id, searchParams.get('group')],
    queryFn: () => getGroupDetail(searchParams.get('group') || ''),
    enabled: !searchParams.get('edit') && !!searchParams.get('group'),
  })

  const expenseMutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSES, QueryType.List, localUser?.id],
      })

      router.back()
    },
  })

  const editExpenseMutation = useMutation({
    mutationFn: editExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSES, QueryType.Details, localUser?.id, searchParams.get('edit')],
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
      splitOption: SplitOption.SplitEqually,
      selectedGroup: undefined,
      paidBy: undefined,
      members: [],
    },
  })

  const memberExpenseAmountForm = useFieldArray({
    control: expenseForm.control,
    name: 'members',
    keyName: 'fieldId',
  })

  const [amount, splitOption, members] = expenseForm.watch(['amount', 'splitOption', 'members'])

  const onSubmitExpenseForm = (value: ExpenseFormType) => {
    if (!expenseForm.formState.isDirty) {
      router.back()
      return
    }

    const data = {
      name: value.name,
      amount: value.amount,
      icon: value.icon,
      iconBgColor: value.iconBgColor,
      memberOption: value.memberOption,
      splitOption: value.splitOption,
      group: value.selectedGroup,
      paidBy: value.paidBy as User,
      members: value.members.map<ExpenseMember>((m) => {
        return {
          amount: m.amount,
          id: m.id,
          imageUrl: m.imageUrl,
          profileBgColor: m.profileBgColor,
          email: m.email,
          name: m.name,
          notiToken: m.notiToken || '',
          referalCode: m.referalCode,
          settledAmount: m.settledAmount || 0,
        }
      }),
    }

    if (searchParams.get('edit')) {
      if (!expenseDetailsQuery.data) {
        toast('Cannot find expense to edit.')
        return
      }

      editExpenseMutation.mutate({
        id: searchParams.get('edit')!,
        ...data,
        timelines: expenseDetailsQuery.data.timelines || [],
        previousPayer: expenseDetailsQuery.data.paidBy,
      })
      return
    }

    expenseMutation.mutate(data)
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
    if (!localUser || expenseForm.getValues('paidBy')) return

    expenseForm.setValue('paidBy', localUser)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localUser])

  useEffect(() => {
    if (!members.length || splitOption === SplitOption.Custom) return

    const memberAmounts = members.map(() => {
      switch (splitOption) {
        case SplitOption.SplitEqually:
          const amountPerMember = Number((amount / members.length).toFixed(2))
          return amountPerMember

        // case SplitOption.PaidByYou:
        //   const amountPerMemberWithoutYou = Number((amount / (members.length - 1)).toFixed(2))
        //   if (member.id === localUser?.id) {
        //     return 0
        //   } else {
        //     return amountPerMemberWithoutYou
        //   }

        // case SplitOption.PaidByThem:
        //   if (member.id === localUser?.id) {
        //     return amount
        //   } else {
        //     return 0
        //   }

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
    if (!expenseDetailsQuery.data) return

    expenseForm.reset({
      name: expenseDetailsQuery.data.name,
      amount: expenseDetailsQuery.data.amount,
      icon: expenseDetailsQuery.data.icon,
      iconBgColor: expenseDetailsQuery.data.iconBgColor,
      memberOption: expenseDetailsQuery.data.memberOption,
      splitOption: expenseDetailsQuery.data.splitOption,
      paidBy: expenseDetailsQuery.data.paidBy,
      selectedGroup: expenseDetailsQuery.data.group || undefined,
      members: Object.values(expenseDetailsQuery.data.member),
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenseDetailsQuery.data])

  useEffect(() => {
    if (!groupDetailQuery.data) return

    expenseForm.setValue('selectedGroup', { id: groupDetailQuery.data.id, name: groupDetailQuery.data.name })
    expenseForm.setValue('memberOption', MemberOption.Group)
    expenseForm.setValue(
      'members',
      groupDetailQuery.data.members.map((member) => ({ ...member, amount: 0, settledAmount: 0 })),
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupDetailQuery.data])

  return {
    expenseForm,
    memberExpenseAmountForm,
    onSubmitExpenseForm,
    isSubmitting: expenseMutation.isPending || editExpenseMutation.isPending,
    isEdit: !!searchParams.get('edit'),
  }
}
