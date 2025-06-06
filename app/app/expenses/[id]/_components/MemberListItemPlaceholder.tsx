import { Skeleton } from '@/components/ui/skeleton'

export function MemberListItemPlaceholder() {
  return (
    <ul className="flex flex-col gap-4">
      {Array.from({ length: 3 }, (_, i) => (
        <li className="flex items-center gap-4" key={i}>
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </li>
      ))}
    </ul>
  )
}
