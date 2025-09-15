import { ExpenseAvatar } from '@/components/ExpenseAvatar'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { djs } from '@/lib/dayjsExt'
import { DEFAULT_DATE_FORMAT } from '@/lib/constants'
import { Expense } from '@/types/common'
import { Timestamp } from 'firebase/firestore'
import { LuChevronRight } from 'react-icons/lu'

export function ExpenseListCard({ amount, createdAt, name, icon, iconBgColor }: Expense) {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4 space-y-0 p-4">
        <ExpenseAvatar icon={icon} iconBgColor={iconBgColor} className="size-12" iconClassName="size-6" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <CardTitle className="overflow-hidden text-ellipsis whitespace-nowrap pb-1 capitalize">{name}</CardTitle>
          <CardDescription className="overflow-hidden text-ellipsis whitespace-nowrap">
            {djs((createdAt as Timestamp).toDate()).format(DEFAULT_DATE_FORMAT)} • ${amount}
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon">
          <LuChevronRight className="h-4 w-4" />
        </Button>
      </CardHeader>
    </Card>
  )
}
