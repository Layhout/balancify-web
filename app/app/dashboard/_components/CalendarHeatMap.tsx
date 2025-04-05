import { Calendar } from '@/components/ui/calendar'
import djs from '@/lib/dayjsExt'

export default function CalendarHeatMap() {
  return (
    <Calendar
      className=""
      classNames={{ day_outside: 'text-transparent pointer-events-none' }}
      disableNavigation
      numberOfMonths={3}
      modifiers={{ l1: djs().toDate(), l2: djs().add(1, 'day').toDate() }}
      modifiersClassNames={{ l1: 'bg-red-100 hover:bg-red-100', l2: 'bg-red-200' }}
    />
  )
}
