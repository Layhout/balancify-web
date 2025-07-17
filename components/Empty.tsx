import { cn } from '@/lib/utils'

export function Empty({
  iconClassName,
  textClassName,
  className,
}: {
  iconClassName?: string
  textClassName?: string
  className?: string
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-8', className)}>
      <img src="/assets/svgs/mood-bad.svg" className={cn('h-32 w-32', iconClassName)} alt="empty icon" />
      <h1 className={cn('mt-8 text-lg', textClassName)}>No Data</h1>
    </div>
  )
}
