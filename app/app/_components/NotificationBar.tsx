import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LuBell } from 'react-icons/lu'

const BAR_HEIGHT = 'h-12'

export function NotificationBar() {
  return (
    <>
      <div className={cn('fixed left-0 right-0 top-0 flex items-start justify-end px-2 pt-2', BAR_HEIGHT)}>
        <Button variant="ghost" size="icon">
          <LuBell className="size-4 flex-shrink-0" />
        </Button>
      </div>
      <div className={BAR_HEIGHT} />
    </>
  )
}
