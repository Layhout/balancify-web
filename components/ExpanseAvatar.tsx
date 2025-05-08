import { cn } from '@/lib/utils'
import { HTMLProps } from 'react'

type ExpanseAvatarProps = {
  iconBgColor: string
  icon: string
  className?: React.ComponentProps<'div'>['className']
  iconClassName?: HTMLProps<HTMLElement>['className']
}

export function ExpanseAvatar({ iconBgColor, icon, className, iconClassName }: ExpanseAvatarProps) {
  return (
    <div
      className={cn('flex h-10 w-10 items-center justify-center rounded-lg', className)}
      style={{ backgroundColor: iconBgColor }}
    >
      <img src={`/assets/svgs/icon-${icon}.svg`} className={cn('h-4 w-4', iconClassName)} alt="icon" />
    </div>
  )
}
