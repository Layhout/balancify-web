import { UserAvatar } from '@/components/UserAvatar'
import { currencyFormatter } from '@/lib/utils'
import { ExpenseMember } from '@/types/common'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/repositories/user'
import { Badge } from '@/components/ui/badge'

export function MemberListItem({ name, amount, imageUrl, profileBgColor, id, settledAmount }: ExpenseMember) {
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
        {amount - settledAmount === 0 && <Badge className="bg-green-500 text-sm text-white">Settled</Badge>}
        {amount - settledAmount > 0 && (
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            owns {currencyFormatter(amount - settledAmount)}
          </p>
        )}
        {amount - settledAmount < 0 && (
          <Badge variant="destructive">Overpaid {currencyFormatter(Math.abs(amount - settledAmount))}</Badge>
        )}
      </div>
    </li>
  )
}
