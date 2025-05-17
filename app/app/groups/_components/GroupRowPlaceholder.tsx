import { Avatar } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function GroupRowPlaceholder() {
  return (
    <li>
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex-[0.6] overflow-hidden lg:flex-[0.3]">
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="mt-2 h-4 w-2/5 lg:hidden" />
          </div>
          <div className="hidden flex-[0.3] items-center lg:flex">
            {Array.from({ length: 3 }, (_, i) => (
              <Avatar key={i} className="-ml-2 h-8 w-8 border bg-background first:ml-0">
                <Skeleton className="h-full w-full" />
              </Avatar>
            ))}
          </div>
          <div className="hidden flex-[0.2] lg:block">
            <Skeleton className="h-4 w-3/5" />
          </div>
          <div className="flex flex-[0.4] items-center justify-between lg:flex-[0.2]">
            <Skeleton className="h-4 w-2/5" />
          </div>
        </CardContent>
      </Card>
    </li>
  )
}
