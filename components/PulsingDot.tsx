import { cn } from '@/lib/utils'

export function PulsingDot({ className }: { className?: string }) {
  return (
    <span className={cn('relative flex size-2', className)}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
      <span className="relative inline-flex h-full w-full rounded-full bg-primary"></span>
    </span>
  )
}
