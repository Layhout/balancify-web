import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ExpenseInfoCardPlaceholder() {
  return (
    <Card>
      <CardContent className="flex flex-col-reverse items-center gap-4 p-6 md:flex-row md:items-start">
        <div className="flex-1">
          <Skeleton className="h-7 w-56" />
          <div className="mt-8 flex flex-col items-center gap-8 md:mt-16 md:flex-row md:items-start md:gap-4">
            <div className="flex-1">
              <Skeleton className="h-7 w-36" />
            </div>
            <div className="flex-1">
              <Skeleton className="h-7 w-36" />
            </div>
          </div>
        </div>
        <Skeleton className="h-20 w-20" />
      </CardContent>
    </Card>
  )
}
