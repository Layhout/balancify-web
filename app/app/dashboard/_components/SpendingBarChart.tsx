import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { useMemo } from 'react'
import { getSpendingPerMonth } from '@/lib/utils'
import { Dashboard } from '@/types/common'

export function SpendingBarChart({ spendingHistory }: { spendingHistory: Dashboard['spendingHistory'] }) {
  const data = useMemo(() => getSpendingPerMonth(spendingHistory), [spendingHistory])

  return (
    <ChartContainer
      config={{
        spent: {
          label: 'Spent',
          color: 'hsl(var(--primary))',
        },
      }}
    >
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => (
                <div className="flex w-full justify-between">
                  <p>{name}</p>
                  <p>${(value as number).toFixed(2)}</p>
                </div>
              )}
            />
          }
        />
        <Bar dataKey="spent" fill="var(--color-spent)" radius={8} maxBarSize={120} />
      </BarChart>
    </ChartContainer>
  )
}
