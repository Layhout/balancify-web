import { cn } from '@/lib/utils'
import { isDarkModeAtom } from '@/repositories/layout'
import { useAtomValue } from 'jotai'
import { HTMLProps } from 'react'

type ExpenseAvatarProps = {
  iconBgColor: string
  icon: string
  className?: React.ComponentProps<'div'>['className']
  iconClassName?: HTMLProps<HTMLElement>['className']
}

export function ExpenseAvatar({ iconBgColor, icon, className, iconClassName }: ExpenseAvatarProps) {
  const isDark = useAtomValue(isDarkModeAtom)

  return (
    <div
      className={cn('flex h-10 w-10 items-center justify-center rounded-lg', className)}
      style={{ backgroundColor: iconBgColor }}
    >
      <img
        src={`/assets/svgs/icon-${icon}.svg`}
        className={cn('h-5 w-5', { invert: isDark }, iconClassName)}
        alt="icon"
      />
    </div>
  )
}
