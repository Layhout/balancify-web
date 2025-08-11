'use client'

import { GroupInfo } from './_components/GroupInfo'
import { ExpenseList } from './_components/ExpenseList'
import { MemberList } from './_components/MemberList'
import { useGroupDetails } from './_hooks/useGroupDetails'
import { ActionButtons } from './_components/ActionButtons'
import { PageHeader } from '@/components/PageHeader'

export default function GroupDetails() {
  const { groupDetailsQuery } = useGroupDetails()

  return (
    <div className="container pb-4">
      <PageHeader title="Group Details" hasBackBtn />
      <GroupInfo
        name={groupDetailsQuery.data?.name || ''}
        description={groupDetailsQuery.data?.description || ''}
        loading={groupDetailsQuery.isFetching}
      />
      <ActionButtons />
      <ExpenseList loading={groupDetailsQuery.isFetching} expenses={[]} />
      <MemberList loading={groupDetailsQuery.isFetching} members={groupDetailsQuery.data?.members || []} />
    </div>
  )
}
