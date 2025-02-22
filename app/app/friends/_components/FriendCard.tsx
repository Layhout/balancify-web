import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Person } from '@/services/group.model'
import { LuMoreVertical } from 'react-icons/lu'

export default function FriendCard({ imageUrl, firstName, lastName, email, profileBgColor }: Person) {
  return (
    <Card className="overflow-hidden ">
      <CardContent className="flex items-center gap-4 p-4">
        <Avatar>
          <AvatarImage src={imageUrl} alt={firstName + ' ' + lastName} />
          <AvatarFallback className="text-xs uppercase" style={{ backgroundColor: profileBgColor }}>
            {firstName[0] + lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 overflow-hidden">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">{firstName + ' ' + lastName}</p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">{email}</p>
        </div>
        <Button variant="ghost" size="icon">
          <LuMoreVertical className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
