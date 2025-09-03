'use client'

import { ActionButtons } from './_components/ActionButtons'
import { ExpenseInfoCard } from './_components/ExpenseInfoCard'
import { MemberList } from './_components/MemberList'
import { TimelineList } from './_components/TimelineList'
import { useExpenseDetails } from './_hooks/useExpenseDetails'
import { PageHeader } from '@/components/PageHeader'

export default function ExpenseDetails() {
  const { expenseDetailsQuery, isOwner, onDelete, hasSettled } = useExpenseDetails()

  return (
    <div className="container pb-4">
      <PageHeader title="Expense Details" hasSearch={false} hasBackBtn />
      <div className="mt-6 flex items-start gap-4">
        <div className="flex-[2] shrink-0">
          <ExpenseInfoCard loading={expenseDetailsQuery.isFetching} details={expenseDetailsQuery.data || null} />
          <ActionButtons
            loading={expenseDetailsQuery.isFetching}
            details={expenseDetailsQuery.data || null}
            isOwner={isOwner}
            onDelete={onDelete}
            hasSettled={hasSettled}
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
