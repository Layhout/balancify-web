import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { EXPENSE_ICONS, BG_COLORS } from '@/lib/constants'
import { randomNumBetween } from '@/lib/utils'
import { useEffect } from 'react'

const memberFormSchema = z.object({
  id: z.string(),
  imageUrl: z.string().optional(),
  profileBgColor: z.string(),
  email: z.string(),
  name: z.string(),
  oneSignalId: z.string().optional(),
  referalCode: z.string(),
})

const expenseFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  amount: z.number().min(1, 'Amount is required'),
  icon: z.string(),
  iconBgColor: z.string(),
  members: z
    .array(memberFormSchema)
    .min(1, 'You need to add at least one member.')
    .max(10, 'Oops! You’ve reached the limit — only 10 members allowed.'),
})

export type MemberFormType = z.infer<typeof memberFormSchema>
export type ExpenseFormType = z.infer<typeof expenseFormSchema>

export function useExpenseForm() {
  const expenseForm = useForm<ExpenseFormType>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      name: '',
      amount: 0,
      icon: '',
      iconBgColor: '',
      members: [],
    },
  })

  const onSubmitExpenseForm = (value: ExpenseFormType) => {
    console.log(value)
  }

  useEffect(() => {
    expenseForm.reset({
      icon: Object.values(EXPENSE_ICONS)[randomNumBetween(0, Object.values(EXPENSE_ICONS).length - 1)],
      iconBgColor: BG_COLORS[randomNumBetween(0, BG_COLORS.length - 1)],
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    expenseForm,
    onSubmitExpenseForm,
  }
}
