import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { djs } from '@/lib/dayjsExt'
import { Noti, NotiType } from '@/types/common'
import { Timestamp } from 'firebase/firestore'
import Link from 'next/link'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { LuCircleDollarSign, LuUserRoundPlus } from 'react-icons/lu'

export function NotificationItem({
  title,
  description,
  createdAt,
  type,
  link,
  onNotiOpen,
}: Noti & { onNotiOpen: (open: boolean) => void }) {
  return (
    <li className="rounded-lg p-2 hover:bg-accent hover:text-accent-foreground">
      <Link href={link}>
        <div className="flex items-start gap-4 rounded-md" onClick={() => onNotiOpen(false)}>
          <Avatar>
            <AvatarFallback>
              {type === NotiType.FriendRequest && <LuUserRoundPlus />}
              {type === NotiType.Group && <AiOutlineUsergroupAdd />}
              {type === NotiType.Expense && <LuCircleDollarSign />}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col">
            <div className="flex items-center">
              <h1 className="flex-1">{title}</h1>
              <p className="text-xs">{djs((createdAt as Timestamp).toDate()).fromNow(true)}</p>
            </div>
            <p className="mt-1 text-xs">{description}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}
