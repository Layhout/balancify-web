'use client'

import { ActionButtons } from './_components/ActionButtons'
import { ExpenseInfoCard } from './_components/ExpenseInfoCard'
import { MemberList } from './_components/MemberList'
import { TimelineList } from './_components/TimelineList'
import { useExpenseDetails } from './_hooks/useExpenseDetails'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'

export default function ExpenseDetails() {
  const { expenseDetailsQuery, isOwner, onDelete } = useExpenseDetails()

  return (
    <div className="container pb-4">
      <PageHeader
        title="Expense Details"
        hasSearch={false}
        hasBackBtn
        action={<Button className="hidden md:block">Settle up</Button>}
      />
      <div className="mt-6 flex items-start gap-4">
        <div className="flex-[2] shrink-0">
          <ExpenseInfoCard loading={expenseDetailsQuery.isFetching} details={expenseDetailsQuery.data || null} />
          <ActionButtons
            loading={expenseDetailsQuery.isFetching}
            details={expenseDetailsQuery.data || null}
            isOwner={isOwner}
            onDelete={onDelete}
          />
          <TimelineList
            loading={expenseDetailsQuery.isFetching}
            timelines={expenseDetailsQuery.data?.timelines || []}
          />
        </div>
        <div className="hidden flex-1 md:block">
          <MemberList
            loading={expenseDetailsQuery.isFetching}
            members={Object.values(expenseDetailsQuery.data?.member || {}) || []}
          />
        </div>
      </div>
    </div>
  )
}
