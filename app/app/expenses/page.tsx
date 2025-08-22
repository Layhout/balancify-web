'use client'

import { Button } from '@/components/ui/button'
import { LuPlus } from 'react-icons/lu'
import { useExpense } from './_hooks/useExpense'
import { ExpenseWrapper } from './_components/ExpenseWrapper'
import { ExpenseCard } from './_components/ExpenseCard'
import Link from 'next/link'
import { PageHeader } from '@/components/PageHeader'
import { ROUTES } from '@/lib/constants'

export default function Expenses() {
  const { expenseData, isPending } = useExpense()

  return (
    <div className="container pb-4">
      <PageHeader
        title="Expenses"
        hasSearch
        action={
          <Button className="gap-2" asChild>
            <Link href={ROUTES.APP.EXPENSES_FORM}>
              <LuPlus className="h-4 w-4" /> Add Expense
            </Link>
          </Button>
        }
      />
      <ExpenseWrapper loading={isPending}>
        {expenseData.map((expense, i) => (
          <ExpenseCard key={i} {...expense} />
        ))}
      </ExpenseWrapper>
    </div>
  )
}
