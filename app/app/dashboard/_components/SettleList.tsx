import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SettleListItemPlaceholder } from './SettleListItemPlaceholder'
import { SettleListItem } from './SettleListItem'
import { Empty } from '@/components/Empty'
import { Expense } from '@/types/common'

export function SettleList({ expenses, loading }: { expenses: Expense[]; loading: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settle Up!</CardTitle>
        <CardDescription>A list of who owned who...</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <SettleListItemPlaceholder />
        ) : expenses.length ? (
          <ul className="flex flex-col gap-4">
            {expenses.map((expense, i) => (
              <SettleListItem key={i} {...expense} />
            ))}
          </ul>
        ) : (
          <Empty iconClassName="size-20" textClassName="text-sm" />
        )}
      </CardContent>
    </Card>
  )
}
