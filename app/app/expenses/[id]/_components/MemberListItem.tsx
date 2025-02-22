import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ExpenseDetailsMember } from '@/services/expense.model'

export default function MemberListItem({
  firstName,
  lastName,
  ownedAmount,
  imageUrl,
  profileBgColor,
}: ExpenseDetailsMember) {
  return (
    <li className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={imageUrl} alt={firstName + ' ' + lastName} />
        <AvatarFallback className="text-xs uppercase" style={{ backgroundColor: profileBgColor }}>
          {firstName[0] + lastName[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 overflow-hidden">
        <h1 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">{firstName + ' ' + lastName}</h1>
        <p className="overflow-hidden text-ellipsis  whitespace-nowrap text-sm">owns ${ownedAmount}</p>
      </div>
    </li>
  )
}
