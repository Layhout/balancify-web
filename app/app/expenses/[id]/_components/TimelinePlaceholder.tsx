import { Skeleton } from '@/components/ui/skeleton'

export default function TimelinePlaceholder() {
  return (
    <ul className="mt-4 pl-4">
      {Array.from({ length: 3 }, (_, i) => (
        <li className="group flex gap-8" key={i}>
          <div className="relative w-0.5 translate-y-3 bg-border group-last:bg-transparent">
            <div className="absolute left-1/2 top-0 flex h-2 w-2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground" />
          </div>
          <div className="flex-1 pb-10">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="mt-3 h-4 w-20" />
          </div>
        </li>
      ))}
    </ul>
  )
}
