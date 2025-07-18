import { ExpanseAvatar } from '@/components/ExpanseAvatar'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Expense } from '@/services/expense.model'
import { LuChevronRight } from 'react-icons/lu'

export function ExpenseListCard({ totalCost, createdAt, name, icon, iconBgColor }: Expense) {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4 space-y-0 p-4">
        <ExpanseAvatar icon={icon} iconBgColor={iconBgColor} className="size-12" iconClassName="size-6" />
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
