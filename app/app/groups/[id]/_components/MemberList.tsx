import FriendCard from '@/app/app/friends/_components/FriendCard'
import FriendCardPlaceholder from '@/app/app/friends/_components/FriendCardPlaceholder'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Person } from '@/services/group.model'

type MemberListProps = {
  loading: boolean
  members: Person[]
}

export default function MemberList({ loading, members }: MemberListProps) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Members</h1>
          {loading ? <Skeleton className="h-6 w-8" /> : <Badge variant="outline">{members.length}</Badge>}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }, (_, i) => <FriendCardPlaceholder key={i} />)
          : members.slice(0, 6).map((member, i) => <FriendCard key={i} {...member} />)}
      </div>
      {members.length > 6 ? (
        <div className="mt-6 flex justify-center">
          <Button variant="secondary">View All</Button>
        </div>
      ) : null}
    </div>
  )
}
