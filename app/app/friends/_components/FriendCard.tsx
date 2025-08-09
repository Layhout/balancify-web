import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { UserAvatar } from '@/components/UserAvatar'
import { FriendResponse, FriendStatusEnum } from '@/types/common'
import { LuCheck, LuEllipsisVertical, LuX } from 'react-icons/lu'

type FriendCardProps = {
  onAcceptRequest?: (id: string) => void
  onRejectRequest?: (id: string) => void
} & FriendResponse

export function FriendCard({
  imageUrl,
  name,
  email,
  profileBgColor,
  status,
  onAcceptRequest,
  onRejectRequest,
  userId,
}: FriendCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex items-center gap-4 p-4">
        <UserAvatar imageUrl={imageUrl || ''} fallbackText={name} profileBgColor={profileBgColor || ''} />
        <div className="flex-1 overflow-hidden">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">{name}</p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">{email}</p>
        </div>
        {status === FriendStatusEnum.Accepted && (
          <Button variant="ghost" size="icon">
            <LuEllipsisVertical className="h-4 w-4" />
          </Button>
        )}
        {status === FriendStatusEnum.Requesting && (
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => onRejectRequest?.(userId)}>
              <LuX />
            </Button>
            <Button variant="ghost" size="icon" className="text-green-500" onClick={() => onAcceptRequest?.(userId)}>
              <LuCheck />
            </Button>
          </div>
        )}
        {status === FriendStatusEnum.Pending && (
          <Badge variant="outline" className="border-yellow-500/50 text-yellow-500">
            Pending
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}
