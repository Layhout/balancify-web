import { PulsingDot } from '@/components/PulsingDot'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'
import { LuUserRoundPlus } from 'react-icons/lu'

type NotificationItemProps = {
  title: string
  description: string
  createdAt: string
  read: boolean
}

export function NotificationItem({ title, description, createdAt, read }: NotificationItemProps) {
  return (
    <li className="rounded-lg p-2 hover:bg-accent hover:text-accent-foreground">
      <Link href="">
        <div className="flex items-start gap-4 rounded-md">
          <Avatar>
            <AvatarFallback>
              <LuUserRoundPlus />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col">
            <div className="flex items-center">
              {!read && <PulsingDot className="mr-2" />}
              <h1 className="flex-1">{title}</h1>
              <p className="text-xs">{createdAt}</p>
            </div>
            <p className="mt-1 text-xs">{description}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}
