import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Expense } from '@/services/expense.model'
import { LuChevronRight } from 'react-icons/lu'

export function ExpenseListCard({ totalCost, createdAt, name, icon, iconBgColor }: Expense) {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4 space-y-0 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg" style={{ backgroundColor: iconBgColor }}>
          <img src={`/assets/svgs/icon-${icon}.svg`} className="h-6 w-6" alt="icon" />
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <CardTitle className="overflow-hidden text-ellipsis whitespace-nowrap pb-1 capitalize">{name}</CardTitle>
          <CardDescription className="overflow-hidden text-ellipsis whitespace-nowrap">
            {createdAt} • ${totalCost}
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon">
          <LuChevronRight className="h-4 w-4" />
        </Button>
      </CardHeader>
    </Card>
  )
}
