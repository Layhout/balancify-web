'use client'

import { GroupInfo } from './_components/GroupInfo'
import { ExpenseList } from './_components/ExpenseList'
import { MemberList } from './_components/MemberList'
import { useGroupDetails } from './_hooks/useGroupDetails'
import { ActionButtons } from './_components/ActionButtons'
import { PageHeader } from '@/components/PageHeader'

type GroupDetailsProps = {
  params: {
    id: string
  }
}

export default function GroupDetails({ params: { id } }: GroupDetailsProps) {
  const { groupDetailsData, isPending } = useGroupDetails(id)

  return (
    <div className="container pb-4">
      <PageHeader title="Group Details" hasBackBtn />
      <GroupInfo
        name={groupDetailsData?.name || ''}
        description={groupDetailsData?.description || ''}
        loading={isPending}
      />
      <ActionButtons />
      <ExpenseList loading={isPending} expenses={groupDetailsData?.expenses || []} />
      <MemberList loading={isPending} members={groupDetailsData?.members || []} />
    </div>
  )
}
