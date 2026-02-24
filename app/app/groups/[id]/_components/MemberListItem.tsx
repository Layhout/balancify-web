import { UserAvatar } from '@/components/UserAvatar'
import { User } from '@/types/common'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/repositories/user'

export function MemberListItem({ name, email, imageUrl, profileBgColor, id }: User) {
  const localUser = useAtomValue(userAtom)

  return (
    <li className="flex items-center gap-4">
      <UserAvatar imageUrl={imageUrl || ''} fallbackText={name} profileBgColor={profileBgColor ?? ''} />
      <div className="flex-1 overflow-hidden">
        <h1 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
          {localUser?.id === id ? 'You' : name}
        </h1>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">{email}</p>
      </div>
    </li>
  )
}
