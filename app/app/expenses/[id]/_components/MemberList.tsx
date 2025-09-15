import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MemberListItem } from './MemberListItem'
import { MemberListItemPlaceholder } from './MemberListItemPlaceholder'
import { ExpenseMember, User } from '@/types/common'

export type MemberListProps = {
  loading: boolean
  members: ExpenseMember[]
  payer?: User
}

export function MemberList({ loading, members, payer }: MemberListProps) {
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
              <MemberListItem key={i} {...member} payer={payer} />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
