import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { UserAvatar } from '@/components/UserAvatar'
import { FriendResponse, FriendStatusEnum } from '@/types/common'
import { LuCheck, LuUserRoundX, LuX } from 'react-icons/lu'
import { ConfirmationDialog } from '@/components/ConfirmationDialog'

type FriendCardProps = {
  onAcceptRequest?: (id: string) => void
  onRejectRequest?: (id: string) => void
  onUnfriend?: (id: string) => void
} & FriendResponse

export function FriendCard({
  imageUrl,
  name,
  email,
  profileBgColor,
  status,
  onAcceptRequest,
  onRejectRequest,
  onUnfriend,
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
          <ConfirmationDialog
            title="Are you sure you want to unfriend?"
            description="This action cannot be undone."
            confirmText="Unfriend"
            triggerBtn={
              <Button size="icon" variant="ghost">
                <LuUserRoundX className="text-destructive" />
              </Button>
            }
            onConfirm={() => onUnfriend?.(userId)}
          />
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
        {(status === FriendStatusEnum.Unfriend || status === FriendStatusEnum.Rejected) && (
          <Badge variant="destructive">{status}</Badge>
        )}
      </CardContent>
    </Card>
  )
}
