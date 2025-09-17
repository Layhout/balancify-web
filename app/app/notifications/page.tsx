'use client'

import { PageHeader } from '@/components/PageHeader'
import { isDesktopAtom } from '@/repositories/layout'
import { useAtomValue } from 'jotai'
import { useNotification } from './_hooks/useNotification'
import { Button } from '@/components/ui/button'
import { LuLoaderCircle } from 'react-icons/lu'
import { Empty } from '@/components/Empty'
import { NotificationItem } from '../_components/NotificationItem'

export default function NotificationsPage() {
  const isDesktop = useAtomValue(isDesktopAtom)

  const { notiData, notiQuery } = useNotification()

  return (
    <div className="container pb-4">
      <PageHeader title="Notifications" hasBackBtn={!isDesktop} />
      {notiQuery.isFetching || notiData.length ? (
        <>
          <ul className="space-y-2">
            {notiData.map((noti, i) => (
              <li key={i}>
                <NotificationItem {...noti} />
              </li>
            ))}
          </ul>
          {notiQuery.hasNextPage && (
            <div className="mt-4 flex justify-center">
              <Button onClick={() => notiQuery.fetchNextPage()} variant="secondary">
                {notiQuery.isFetchingNextPage && <LuLoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
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
