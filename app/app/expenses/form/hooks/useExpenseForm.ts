import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { EXPENSE_ICONS, BG_COLORS } from '@/lib/constants'
import { randomNumBetween } from '@/lib/utils'
import { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/repositories/user'

const memberFormSchema = z.object({
  id: z.string(),
  imageUrl: z.string().optional(),
  profileBgColor: z.string(),
  email: z.string(),
  name: z.string(),
  oneSignalId: z.string().optional(),
  referalCode: z.string(),
})

const expenseFormSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    amount: z.number().min(1, 'Amount is required'),
    icon: z.string(),
    iconBgColor: z.string(),
    memberExpenseAmount: z.record(z.string(), z.number()),
    memberOption: z.enum(['group', 'friend']),
    splitOption: z.enum(['paid_equally', 'paid_by_you', 'paid_by_them', 'custom']),
    selectedGroup: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .optional(),
    members: z
      .array(memberFormSchema)
      .min(1, 'You need to add at least one member.')
      .max(10, 'Oops! You’ve reached the limit — only 10 members allowed.'),
  })
  .refine((data) => Object.values(data.memberExpenseAmount).reduce((a, b) => a + b, 0) === data.amount, {
    message: 'Total amount does not match',
    path: ['amount'],
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
      memberExpenseAmount: {},
      memberOption: 'group',
      splitOption: 'paid_equally',
      selectedGroup: undefined,
      members: [],
    },
  })

  const [memberOption] = expenseForm.watch(['memberOption', 'amount', 'splitOption', 'members'])

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
    expenseForm.setValue('members', memberOption === 'friend' && localUser ? [localUser] : [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberOption])

  return {
    expenseForm,
    onSubmitExpenseForm,
  }
}
