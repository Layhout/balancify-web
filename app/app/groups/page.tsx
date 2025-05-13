'use client'

import { Button } from '@/components/ui/button'
import { LuPlus } from 'react-icons/lu'
import { useGroup } from './_hooks/useGroup'
import { GroupWrapper } from './_components/GroupWrapper'
import { GroupRow } from './_components/GroupRow'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants'
import { PageHeader } from '@/components/PageHeader'

export default function Groups() {
  const { isPending, groupData } = useGroup()

  return (
    <div className="container pb-4">
      <PageHeader
        title="Groups"
        hasSearch
        action={
          <Button className="gap-2" asChild>
            <Link href={ROUTES.APP.GROUPS_CREATE}>
              <LuPlus className="h-4 w-4" /> New Group
            </Link>
          </Button>
        }
      />
      <GroupWrapper loading={isPending}>
        {groupData.map((group, i) => (
          <GroupRow key={i} {...group} />
        ))}
      </GroupWrapper>
    </div>
  )
}
