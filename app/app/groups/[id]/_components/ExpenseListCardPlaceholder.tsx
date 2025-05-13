import { Card, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ExpenseListCardPlaceholder() {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4 space-y-0 p-4">
        <Skeleton className="h-12 w-12" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Skeleton className="mb-2 h-4 w-3/5" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </CardHeader>
    </Card>
  )
}
