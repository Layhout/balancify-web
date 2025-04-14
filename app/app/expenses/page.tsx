'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LuPlus } from 'react-icons/lu'
import { useExpense } from './_hooks/useExpense'
import ExpenseWrapper from './_components/ExpenseWrapper'
import ExpenseCard from './_components/ExpenseCard'

export default function Expenses() {
  const { expenseData, isPending } = useExpense()

  return (
    <div className="container pb-4">
      <div className="mt-8 flex items-center justify-between md:mt-0">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <Button className="gap-2 md:hidden">
          <LuPlus className="h-4 w-4" /> Add Expense
        </Button>
      </div>
      <div className="my-6 flex items-center justify-between gap-4">
        <Input className="md:max-w-sm" placeholder="Search..." type="search" />
        <Button className="hidden gap-2 md:flex">
          <LuPlus className="h-4 w-4" /> Add Expense
        </Button>
      </div>
      <ExpenseWrapper loading={isPending}>
        {expenseData.map((expense, i) => (
          <ExpenseCard key={i} {...expense} />
        ))}
      </ExpenseWrapper>
    </div>
  )
}
