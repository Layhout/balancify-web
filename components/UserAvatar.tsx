import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

type UserAvatarProps = {
  imageUrl: string
  fallbackText: string
  profileBgColor?: string
  className?: string
  fallbackTextclassName?: string
}

export function UserAvatar({
  fallbackText,
  imageUrl,
  profileBgColor,
  className,
  fallbackTextclassName,
}: UserAvatarProps) {
  return (
    <Avatar className={cn('bg-background', className)}>
      <AvatarImage src={imageUrl} alt={fallbackText} className="size-full" />
      <AvatarFallback
        className={cn(
          'relative size-full overflow-hidden bg-background text-xs uppercase after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[var(--profile-bg-color)]',
          fallbackTextclassName,
        )}
        style={{ '--profile-bg-color': profileBgColor } as React.CSSProperties}
      >
        <span className="relative z-10">{fallbackText ? `${fallbackText[0] + fallbackText[1]}` : ''}</span>
      </AvatarFallback>
    </Avatar>
  )
}
