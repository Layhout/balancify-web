import { Calendar } from '@/components/ui/calendar'
import djs from '@/lib/dayjsExt'
import { SpendingHistory } from '@/services/dashboard.model'
import { DayContentProps } from 'react-day-picker'
import { useCallback, useMemo } from 'react'
import { getSpendingLevel, isMobileBrowser } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { STANDARD_DATE_FORMAT } from '@/lib/constants'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export default function CalendarHeatMap({ spendingHistory }: { spendingHistory: SpendingHistory[] }) {
  const { l1, l2, l3, l4 } = useMemo(() => getSpendingLevel(spendingHistory), [spendingHistory])
  const isMobileDevice = useMemo(isMobileBrowser, [])

  const dayComponent = useCallback(
    ({ date, activeModifiers }: DayContentProps) => {
      if (Object.keys(activeModifiers).some((key) => ['l1', 'l2', 'l3', 'l4'].includes(key))) {
        const day = djs(date).format('D')
        const amount =
          l1[djs(date).format(STANDARD_DATE_FORMAT)] ||
          l2[djs(date).format(STANDARD_DATE_FORMAT)] ||
          l3[djs(date).format(STANDARD_DATE_FORMAT)] ||
          l4[djs(date).format(STANDARD_DATE_FORMAT)]

        if (isMobileDevice) {
          return (
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex h-full w-full items-center justify-center">{day}</div>
              </PopoverTrigger>
              <PopoverContent side="top" className="w-fit px-3 py-1.5">
                <span>${amount}</span>
              </PopoverContent>
            </Popover>
          )
        }

        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex h-full w-full items-center justify-center">{day}</div>
            </TooltipTrigger>
            <TooltipContent>
              <span>${amount}</span>
            </TooltipContent>
          </Tooltip>
        )
      }

      return <>{djs(date).format('D')}</>
    },
    [isMobileDevice, l1, l2, l3, l4],
  )

  return (
    <Calendar
      styles={{ cell: { minWidth: '32px' } }}
      classNames={{ months: 'flex flex-row gap-4 flex-wrap justify-center items-start' }}
      showOutsideDays={false}
      disableNavigation
      numberOfMonths={3}
      defaultMonth={djs().add(-2, 'month').toDate()}
      modifiers={{
        l1: Object.keys(l1).map((s) => djs(s).toDate()),
        l2: Object.keys(l2).map((s) => djs(s).toDate()),
        l3: Object.keys(l3).map((s) => djs(s).toDate()),
        l4: Object.keys(l4).map((s) => djs(s).toDate()),
      }}
      modifiersClassNames={{
        l1: 'bg-primary/20 hover:bg-primary/20',
        l2: 'bg-primary/40 hover:bg-primary/40',
        l3: 'bg-primary/60 hover:bg-primary/60 text-primary-foreground hover:text-primary-foreground',
        l4: 'bg-primary/80 hover:bg-primary/80 text-primary-foreground hover:text-primary-foreground',
      }}
      components={{
        DayContent: dayComponent,
      }}
    />
  )
}
