import { Noti } from '@/types/common'
import { NotificationItem } from './NotificationItem'
import { Empty } from '@/components/Empty'
import { ScrollArea } from '@/components/ui/scroll-area'

export function NotificationList({ notis }: { notis: Noti[] }) {
  return (
    <div>
      <h1 className="p-4 pb-0 text-lg font-bold">Notifications</h1>
      <ScrollArea className="h-96">
        {notis.length ? (
          <ul className="mt-4 flex flex-col px-2">
            {notis.map((n, i) => (
              <NotificationItem key={i} {...n} />
            ))}
          </ul>
        ) : (
          <Empty iconClassName="size-20" textClassName="text-sm" className="mt-12" />
        )}
      </ScrollArea>
    </div>
  )
}
