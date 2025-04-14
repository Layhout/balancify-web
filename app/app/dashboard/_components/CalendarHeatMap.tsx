import { Calendar } from '@/components/ui/calendar'
import djs from '@/lib/dayjsExt'
import { DayContentProps } from 'react-day-picker'

export default function CalendarHeatMap() {
  return (
    <Calendar
      className=""
      classNames={{ day_outside: 'text-transparent pointer-events-none' }}
      disableNavigation
      numberOfMonths={3}
      modifiers={{ l1: djs().toDate(), l2: djs().add(1, 'day').toDate() }}
      modifiersClassNames={{ l1: 'bg-primary/20 hover:bg-primary/20', l2: 'bg-primary/40 hover:bg-primary/40' }}
      components={{
        DayContent: (props: DayContentProps) => {
          // console.log(djs(props.date).format('DD'), props)
          if (props.activeModifiers.l2) {
            return <p>👌</p>
          }

          return <div>{djs(props.date).format('DD')}</div>
        },
      }}
    />
  )
}
