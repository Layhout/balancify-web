import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { NOTIFICATION_BAR_HEIGHT } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { LuBell } from 'react-icons/lu'
import { NotificationList } from './NotificationList'
import { Noti } from '@/types/common'
import { PulsingDot } from '@/components/PulsingDot'

export function NotificationBar({
  notis,
  hasUnreadNoti,
  onNotiOpen,
}: {
  notis: Noti[]
  hasUnreadNoti: boolean
  onNotiOpen: (open: boolean) => void
}) {
  return (
    <>
      <div
        className={cn(
          'fixed left-0 right-0 top-0 z-40 flex items-start justify-end px-2 pt-2',
          NOTIFICATION_BAR_HEIGHT,
        )}
      >
        <Popover onOpenChange={onNotiOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <LuBell className="size-4 flex-shrink-0" />
              {hasUnreadNoti && <PulsingDot className="absolute right-2.5 top-1.5" />}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" side="bottom" className="w-96 p-0">
            <NotificationList notis={notis} />
          </PopoverContent>
        </Popover>
      </div>
      <div className={NOTIFICATION_BAR_HEIGHT} />
    </>
  )
}
