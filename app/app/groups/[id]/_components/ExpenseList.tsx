import { Badge } from '@/components/ui/badge'
import { ExpenseListCard } from './ExpenseListCard'
// import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { ExpenseListCardPlaceholder } from './ExpenseListCardPlaceholder'
import { Expense } from '@/services/expense.model'
import { Empty } from '@/components/Empty'

type ExpenseListProps = {
  loading: boolean
  expenses: Expense[]
}

export function ExpenseList({ loading, expenses }: ExpenseListProps) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Expenses</h1>
          {loading ? <Skeleton className="h-6 w-8" /> : <Badge variant="outline">{expenses.length}</Badge>}
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden whitespace-nowrap text-sm md:inline">Sorted By</span>
          <Select defaultValue="last updated" disabled={loading}>
            <SelectTrigger>
              <SelectValue placeholder="Select sorted by" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="last updated">Last Updated</SelectItem>
              <SelectItem value="last created">Last Created</SelectItem>
              <SelectItem value="most amount">Most Amount</SelectItem>
              <SelectItem value="least amount">Least Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }, (_, i) => <ExpenseListCardPlaceholder key={i} />)
          : expenses.map((expense, i) => <ExpenseListCard key={i} {...expense} />)}
      </div>
      {!expenses.length && !loading && <Empty />}
      {/* <div className="mt-6 flex justify-center">
        <Button variant="secondary">Load More</Button>
      </div> */}
    </div>
  )
}
