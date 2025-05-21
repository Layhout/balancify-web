import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ExpenseCardPlaceholder() {
  return (
    <Card className="overflow-hidden ">
      <CardHeader className="flex-row items-center gap-4 space-y-0 border-b p-4">
        <Skeleton className="h-12 w-12" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Skeleton className="mb-2 h-4 w-3/5" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between px-4 py-5">
        <div className="flex items-center">
          {Array.from({ length: 4 }).map((_, i) => (
            <Avatar key={i} className="-ml-2 h-8 w-8 border bg-background first:ml-0">
              <Skeleton className="h-full w-full" />
            </Avatar>
          ))}
        </div>
        <div className="flex flex-col items-end gap-2">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-12" />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0 ">
        <Skeleton className="h-4 w-14" />
        <Button disabled variant="secondary" size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
