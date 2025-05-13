'use client'

import { Button } from '@/components/ui/button'
import { HiOutlineCog6Tooth } from 'react-icons/hi2'
import { GroupInfo } from './_components/GroupInfo'
import { ExpenseList } from './_components/ExpenseList'
import { MemberList } from './_components/MemberList'
import { useGroupDetails } from './_hooks/useGroupDetails'
import { ActionButtons } from './_components/ActionButtons'

type GroupDetailsProps = {
  params: {
    id: string
  }
}

export default function GroupDetails({ params: { id } }: GroupDetailsProps) {
  const { groupDetailsData, isPending } = useGroupDetails(id)

  return (
    <div className="container pb-4">
      <div className="mt-8 flex items-center justify-between md:mt-0">
        <h1 className="text-3xl font-bold">Group Details</h1>
        <Button className="hidden gap-2 md:inline-flex">
          <HiOutlineCog6Tooth className="h-4 w-4" /> Edit
        </Button>
      </div>
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
