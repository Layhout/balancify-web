'use client'

import { GroupInfo } from './_components/GroupInfo'
import { ExpenseList } from './_components/ExpenseList'
import { useGroupDetails } from './_hooks/useGroupDetails'
import { ActionButtons } from './_components/ActionButtons'
import { PageHeader } from '@/components/PageHeader'
import { MemberList } from './_components/MemberList'

export default function GroupDetails() {
  const { groupDetailsQuery, onEditGroup, onLeaveGroup } = useGroupDetails()

  return (
    <div className="container pb-4">
      <PageHeader title="Group Details" hasBackBtn />
      <div className="flex items-start gap-4">
        <div className="flex-[2] shrink-0">
          <GroupInfo
            name={groupDetailsQuery.data?.name || ''}
            description={groupDetailsQuery.data?.description || ''}
            loading={groupDetailsQuery.isFetching}
          />
          <ActionButtons
            loading={groupDetailsQuery.isFetching}
            members={groupDetailsQuery.data?.members || []}
            onEditGroup={onEditGroup}
            onLeaveGroup={onLeaveGroup}
          />
          <ExpenseList loading={groupDetailsQuery.isFetching} expenses={[]} />
        </div>
        <div className="hidden flex-1 md:block">
          <MemberList loading={groupDetailsQuery.isFetching} members={groupDetailsQuery.data?.members || []} />
        </div>
      </div>
    </div>
  )
}
