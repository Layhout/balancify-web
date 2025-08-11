import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { User } from '@/types/common'
import { MemberCardPlaceholder } from './MemberCardPlaceholder'
import { MemberCard } from './MemberCard'

type MemberListProps = {
  loading: boolean
  members: User[]
}

export function MemberList({ loading, members }: MemberListProps) {
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
          ? Array.from({ length: 3 }, (_, i) => <MemberCardPlaceholder key={i} />)
          : members.slice(0, 6).map((member, i) => <MemberCard key={i} {...member} />)}
      </div>
    </div>
  )
}
