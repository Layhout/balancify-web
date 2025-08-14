'use client'

import { Button } from '@/components/ui/button'
import { LuLoaderCircle, LuPlus } from 'react-icons/lu'
import { useGroup } from './_hooks/useGroup'
import { GroupWrapper } from './_components/GroupWrapper'
import { GroupRow } from './_components/GroupRow'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants'
import { PageHeader } from '@/components/PageHeader'
import { useAtomValue } from 'jotai'
import { isDesktopAtom } from '@/repositories/layout'
import { Empty } from '@/components/Empty'

export default function Groups() {
  const { groupQuery, groupData, setSearch } = useGroup()
  const isDesktop = useAtomValue(isDesktopAtom)

  return (
    <div className="container pb-4">
      <PageHeader
        title="Groups"
        hasBackBtn={!isDesktop}
        hasSearch
        onSearch={setSearch}
        action={
          <Button className="gap-2" asChild>
            <Link href={ROUTES.APP.GROUPS_CREATE}>
              <LuPlus className="h-4 w-4" /> New Group
            </Link>
          </Button>
        }
      />
      {groupQuery.isFetching || groupData.length ? (
        <>
          <GroupWrapper loading={groupQuery.isFetching && !groupQuery.isFetchingNextPage}>
            {groupData.map((group, i) => (
              <GroupRow key={i} {...group} />
            ))}
          </GroupWrapper>
          {groupQuery.hasNextPage && (
            <div className="mt-4 flex justify-center">
              <Button onClick={() => groupQuery.fetchNextPage()} variant="secondary">
                {groupQuery.isFetchingNextPage && <LuLoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Load More
              </Button>
            </div>
          )}
        </>
      ) : (
        <Empty />
      )}
    </div>
  )
}
