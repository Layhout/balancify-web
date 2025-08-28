import { UserAvatar } from '@/components/UserAvatar'
import { Timeline } from '@/services/expense.model'

export function TimelineItem({ createdBy, createdAt, events }: Timeline) {
  return (
    <li className="group flex gap-8">
      <div className="relative w-0.5 translate-y-3 bg-border group-last:bg-transparent">
        <div className="absolute left-1/2 top-0 flex h-2 w-2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground" />
      </div>
      <div className="flex-1 pb-10">
        <div className="flex items-start gap-2">
          <UserAvatar
            className="mt-0.5 h-5 w-5 border"
            fallbackText={`${createdBy.name[0]} ${createdBy.name[1]}`}
            imageUrl={createdBy.imageUrl || ''}
            profileBgColor={createdBy.profileBgColor}
          />
          <h1>
            {createdBy.name} • {createdAt}
          </h1>
        </div>
        <p className="mt-2">{events}</p>
      </div>
    </li>
  )
}
