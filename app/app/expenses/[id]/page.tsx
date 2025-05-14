'use client'

import ExpenseInfoCard from './_components/ExpenseInfoCard'
import MemberList from './_components/MemberList'
import TimelineList from './_components/TimelineList'
import useExpenseDetails from './_hooks/useExpenseDetails'
import { PageHeader } from '@/components/PageHeader'
type ExpenseDetailsProps = {
  params: {
    id: string
  }
}

export default function ExpenseDetails({ params: { id } }: ExpenseDetailsProps) {
  const { expenseDetailsData, isPending } = useExpenseDetails(id)

  return (
    <div className="container pb-4">
      <PageHeader title="Expense Details" hasSearch={false} hasBackBtn />
      <div className="mt-6 flex items-start gap-4">
        <div className="flex-[2] shrink-0">
          <ExpenseInfoCard loading={isPending} details={expenseDetailsData} />
          <TimelineList loading={isPending} timelines={expenseDetailsData?.timelines || []} />
        </div>
        <div className="hidden flex-1 md:block">
          <MemberList loading={isPending} members={expenseDetailsData?.members || []} />
        </div>
      </div>
    </div>
  )
}
