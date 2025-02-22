'use client'

import { Button } from '@/components/ui/button'
import ExpenseInfoCard from './_components/ExpenseInfoCard'
import MemberList from './_components/MemberList'
import TimelineList from './_components/TimelineList'
import useExpenseDetails from './_hooks/useExpenseDetails'
import { MdOutlinePayments } from 'react-icons/md'

type ExpenseDetailsProps = {
  params: {
    id: string
  }
}

export default function ExpenseDetails({ params: { id } }: ExpenseDetailsProps) {
  const { expenseDetailsData, isPending } = useExpenseDetails(id)

  return (
    <div className="container pb-4">
      <div className="mt-8 flex items-center justify-between md:mt-0">
        <h1 className="text-3xl font-bold">Expense Details</h1>
        <Button className="hidden gap-2 md:inline-flex" disabled={isPending}>
          <MdOutlinePayments className="h-4 w-4" />
          Settle up
        </Button>
      </div>
      <div className="mt-6 flex items-start gap-4">
        <div className="flex-[2] shrink-0">
          <ExpenseInfoCard loading={isPending} details={expenseDetailsData} />
          <TimelineList loading={isPending} timelines={expenseDetailsData?.timelines} />
        </div>
        <div className="hidden flex-1 overflow-hidden md:block">
          <MemberList loading={isPending} members={expenseDetailsData?.members} />
        </div>
      </div>
    </div>
  )
}
