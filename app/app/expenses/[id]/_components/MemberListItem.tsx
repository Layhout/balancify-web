import { UserAvatar } from '@/components/UserAvatar'
import { ExpenseDetailsMember } from '@/services/expense.model'

export function MemberListItem({ firstName, lastName, ownedAmount, imageUrl, profileBgColor }: ExpenseDetailsMember) {
  return (
    <li className="flex items-center gap-4">
      <UserAvatar
        imageUrl={imageUrl || ''}
        fallbackText={firstName + ' ' + lastName}
        profileBgColor={profileBgColor ?? ''}
      />
      <div className="flex-1 overflow-hidden">
        <h1 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">{firstName + ' ' + lastName}</h1>
        <p className="overflow-hidden text-ellipsis  whitespace-nowrap text-sm">owns ${ownedAmount}</p>
      </div>
    </li>
  )
}
