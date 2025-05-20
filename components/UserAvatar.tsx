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
    <Avatar className={className}>
      <AvatarImage src={imageUrl} alt={fallbackText} className="size-full" />
      <AvatarFallback
        className={cn('size-full text-xs uppercase', fallbackTextclassName)}
        style={{ backgroundColor: profileBgColor }}
      >
        {fallbackText ? `${fallbackText[0] + fallbackText[1]}` : ''}
      </AvatarFallback>
    </Avatar>
  )
}
