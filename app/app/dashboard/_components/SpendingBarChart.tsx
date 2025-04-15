import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { SpendingHistory } from '@/services/dashboard.model'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { useMemo } from 'react'
import { getSpendingPerMonth } from '@/lib/utils'

export default function SpendingBarChart({ spendingHistory }: { spendingHistory: SpendingHistory[] }) {
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
        <Bar dataKey="spent" fill="var(--color-spent)" radius={8} />
      </BarChart>
    </ChartContainer>
  )
}
