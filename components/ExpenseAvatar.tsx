import { cn } from '@/lib/utils'
import { HTMLProps } from 'react'

type ExpenseAvatarProps = {
  iconBgColor: string
  icon: string
  className?: React.ComponentProps<'div'>['className']
  iconClassName?: HTMLProps<HTMLElement>['className']
}

export function ExpenseAvatar({ iconBgColor, icon, className, iconClassName }: ExpenseAvatarProps) {
  return (
    <div
      className={cn('flex h-10 w-10 items-center justify-center rounded-lg', className)}
      style={{ backgroundColor: iconBgColor }}
    >
      <img src={`/assets/svgs/icon-${icon}.svg`} className={cn('h-5 w-5 invert', iconClassName)} alt="icon" />
    </div>
  )
}
