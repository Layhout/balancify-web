import { UserAvatar } from '@/components/UserAvatar'
import { DEFAULT_DATETIME_FORMAT } from '@/lib/constants'
import { djs } from '@/lib/dayjsExt'
import { Timeline } from '@/types/common'

export function TimelineItem({ createdBy, createdAt, events }: Timeline) {
  return (
    <li className="group flex gap-8">
      <div className="relative w-0.5 translate-y-3 bg-border group-last:bg-transparent">
        <div className="absolute left-1/2 top-0 flex h-2 w-2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground" />
      </div>
      <div className="flex-1 pb-10">
        <div className="flex items-start gap-2">
          <UserAvatar
            className="mt-0.5 h-6 w-6 border"
            fallbackText={`${createdBy.name[0]} ${createdBy.name[1]}`}
            imageUrl={createdBy.imageUrl || ''}
            profileBgColor={createdBy.profileBgColor}
          />
          <div>
            <h1>{createdBy.name}</h1>
            <p className="text-xs text-muted-foreground">{djs(createdAt).format(DEFAULT_DATETIME_FORMAT)}</p>
          </div>
        </div>
        <p className="mt-2">{events}</p>
      </div>
    </li>
  )
}
