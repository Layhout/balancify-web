import { cn } from '@/lib/utils'

export function Empty({
  iconClassName,
  textClassName,
  className,
  text = 'No Data',
}: {
  iconClassName?: string
  textClassName?: string
  className?: string
  text?: string
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-8', className)}>
      <img src="/assets/svgs/mood-bad.svg" className={cn('size-20', iconClassName)} alt="empty icon" />
      <h1 className={cn('mt-8 text-lg', textClassName)}>{text}</h1>
    </div>
  )
}
