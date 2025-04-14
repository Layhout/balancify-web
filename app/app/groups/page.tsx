'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LuPlus } from 'react-icons/lu'
import { useGroup } from './_hooks/useGroup'
import GroupWrapper from './_components/GroupWrapper'
import GroupRow from './_components/GroupRow'

export default function Groups() {
  const { isPending, groupData } = useGroup()

  return (
    <div className="container pb-4">
      <div className="mt-8 flex items-center justify-between md:mt-0">
        <h1 className="text-3xl font-bold">Groups</h1>
        <Button className="gap-2 md:hidden">
          <LuPlus className="h-4 w-4" /> New Group
        </Button>
      </div>
      <div className="my-6 flex items-center justify-between gap-4">
        <Input className="md:max-w-sm" placeholder="Search..." type="search" />
        <Button className="hidden gap-2 md:flex">
          <LuPlus className="h-4 w-4" /> New Group
        </Button>
      </div>
      <GroupWrapper loading={isPending}>
        {groupData.map((group, i) => (
          <GroupRow key={i} {...group} />
        ))}
      </GroupWrapper>
    </div>
  )
}
