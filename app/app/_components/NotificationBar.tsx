import { Button } from '@/components/ui/button'
import { NOTIFICATION_BAR_HEIGHT } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { LuBell } from 'react-icons/lu'

export function NotificationBar() {
  return (
    <>
      <div className={cn('fixed left-0 right-0 top-0 flex items-start justify-end px-2 pt-2', NOTIFICATION_BAR_HEIGHT)}>
        <Button variant="ghost" size="icon">
          <LuBell className="size-4 flex-shrink-0" />
        </Button>
      </div>
      <div className={NOTIFICATION_BAR_HEIGHT} />
    </>
  )
}
