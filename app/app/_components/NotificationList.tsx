import { Noti } from '@/types/common'
import { NotificationItem } from './NotificationItem'
import { Empty } from '@/components/Empty'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants'

export function NotificationList({ notis, onNotiOpen }: { notis: Noti[]; onNotiOpen: (open: boolean) => void }) {
  return (
    <div>
      <h1 className="p-4 pb-0 text-lg font-bold">Notifications</h1>
      <ScrollArea className="h-96">
        {notis.length ? (
          <ul className="mt-4 flex flex-col px-2">
            {notis.map((n, i) => (
              <NotificationItem key={i} {...n} onNotiOpen={onNotiOpen} />
            ))}
          </ul>
        ) : (
          <Empty iconClassName="size-20" textClassName="text-sm" className="mt-12" text="No unread notifications" />
        )}
      </ScrollArea>
      <div className="text-center">
        <Button asChild variant="link" className="p-4">
          <Link href={ROUTES.APP.NOTIFICATIONS} onClick={() => onNotiOpen?.(false)}>
            View All
          </Link>
        </Button>
      </div>
    </div>
  )
}
