import { UserAvatar } from '@/components/UserAvatar'
import { User } from '@/types/common'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/repositories/user'
import { Badge } from '@/components/ui/badge'

export function MemberListItem({ name, email, imageUrl, profileBgColor, id }: User) {
  const localUser = useAtomValue(userAtom)

  return (
    <li className="flex items-center gap-4">
      <UserAvatar
        imageUrl={imageUrl || ''}
        fallbackText={name[0] + ' ' + name[1]}
        profileBgColor={profileBgColor ?? ''}
      />
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <h1 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">{name}</h1>
          {localUser?.id === id && <Badge>You</Badge>}
        </div>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">{email}</p>
      </div>
    </li>
  )
}
