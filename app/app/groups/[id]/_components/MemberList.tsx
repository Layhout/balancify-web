import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MemberListItem } from './MemberListItem'
import { User } from '@/types/common'
import { MemberListItemPlaceholder } from './MemberListItemPlaceholder'

export type MemberListProps = {
  loading: boolean
  members: User[]
  groupOwner?: User
}

export function MemberList({ loading, members, groupOwner }: MemberListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Members</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <MemberListItemPlaceholder />
        ) : (
          <ul className="flex flex-col gap-4">
            {members.map((member, i) => (
              <MemberListItem
                key={i}
                {...member}
                name={member.id === groupOwner?.id ? `${member.name} (Owner)` : member.name}
              />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
