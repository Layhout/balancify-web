import { Timeline } from '@/types/common'
import { TimelineItem } from './TimelineItem'
import { TimelinePlaceholder } from './TimelinePlaceholder'

type TimelineProps = {
  loading: boolean
  timelines: Timeline[]
}

export function TimelineList({ loading, timelines }: TimelineProps) {
  return (
    <div className="mt-4">
      <h1 className="text-lg font-bold">Timeline</h1>
      <ul className="mt-4 pl-4">
        {loading ? <TimelinePlaceholder /> : timelines.map((timeline, i) => <TimelineItem key={i} {...timeline} />)}
      </ul>
    </div>
  )
}
