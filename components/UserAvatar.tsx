import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

type UserAvatarProps = {
  imageUrl: string
  fallbackText: string
  profileBgColor: string
}

export function UserAvatar({ fallbackText, imageUrl, profileBgColor }: UserAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={imageUrl} alt={fallbackText} />
      <AvatarFallback className="text-xs uppercase" style={{ backgroundColor: profileBgColor }}>
        {fallbackText[0] + fallbackText[1]}
      </AvatarFallback>
    </Avatar>
  )
}
