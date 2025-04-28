import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Expense } from '@/services/expense.model'
import SettleListItemPlaceholder from './SettleListItemPlaceholder'
import SettleListItem from './SettleListItem'

export default function SettleList({ toBeSettled, loading }: { toBeSettled: Expense[]; loading: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settle Up!</CardTitle>
        <CardDescription>A list of who owned who...</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <SettleListItemPlaceholder />
        ) : (
          <ul className="flex flex-col gap-4">
            {toBeSettled.map((expense, i) => (
              <SettleListItem key={i} {...expense} />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
