import { Card, CardContent } from '@/components/ui/card'
import { UserAvatar } from '@/components/UserAvatar'
import { User } from '@/types/common'

export function MemberCard({ imageUrl, name, email, profileBgColor }: User) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex items-center gap-4 p-4">
        <UserAvatar imageUrl={imageUrl || ''} fallbackText={name} profileBgColor={profileBgColor || ''} />
        <div className="flex-1 overflow-hidden">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">{name}</p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">{email}</p>
        </div>
      </CardContent>
    </Card>
  )
}
