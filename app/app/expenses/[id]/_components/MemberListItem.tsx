import { UserAvatar } from '@/components/UserAvatar'
import { currencyFormatter } from '@/lib/utils'
import { ExpenseMember } from '@/types/common'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/repositories/user'

export function MemberListItem({ name, amount, imageUrl, profileBgColor, id }: ExpenseMember) {
  const localUser = useAtomValue(userAtom)

  return (
    <li className="flex items-center gap-4">
      <UserAvatar
        imageUrl={imageUrl || ''}
        fallbackText={name[0] + ' ' + name[1]}
        profileBgColor={profileBgColor ?? ''}
      />
      <div className="flex-1 overflow-hidden">
        <h1 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
          {id === localUser?.id ? 'You' : name}
        </h1>
        <p className="overflow-hidden text-ellipsis  whitespace-nowrap text-sm">owns {currencyFormatter(amount)}</p>
      </div>
    </li>
  )
}
