import { AvatarStack } from '@/components/AvatarStack'
import { ExpenseAvatar } from '@/components/ExpenseAvatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DEFAULT_DATE_FORMAT, ROUTES } from '@/lib/constants'
import { Expense } from '@/types/common'
import Link from 'next/link'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/repositories/user'
import { Timestamp } from 'firebase/firestore'
import { djs } from '@/lib/dayjsExt'

export function ExpenseCard({ id, name, createdAt, icon, iconBgColor, amount, member, paidBy }: Expense) {
  const localUser = useAtomValue(userAtom)

  const settledPercentage = Math.round(
    (Object.values(member).reduce((p, c) => p + (c.settledAmount || 0), 0) / amount) * 100,
  )

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="flex-row items-center gap-4 space-y-0 border-b p-4">
        <ExpenseAvatar iconBgColor={iconBgColor} icon={icon} className="h-12 w-12" iconClassName="h-6 w-6" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <CardTitle className="overflow-hidden text-ellipsis whitespace-nowrap pb-1 capitalize">{name}</CardTitle>
          <CardDescription className="overflow-hidden text-ellipsis whitespace-nowrap text-xs">
            Paid by {paidBy.id === localUser?.id ? 'You' : paidBy.name}
          </CardDescription>
        </div>
        <h1 className="text-lg font-bold text-foreground">${amount}</h1>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-between p-4">
        <AvatarStack
          items={Object.values(member).map((m) => ({
            imageSrc: m.imageUrl,
            initial: m.name[0] + m.name[1],
            bgColor: m.profileBgColor,
          }))}
          className="-ml-2 h-8 w-8 border-0"
        />
        <div className="flex flex-col items-end">
          <p className="font-bold">{settledPercentage}%</p>
          {settledPercentage === 100 && <p className="text-sm text-green-500">Settled</p>}
          {settledPercentage < 100 && <p className="text-sm text-muted-foreground">Paid</p>}
          {settledPercentage > 100 && <p className="text-sm text-red-500">Overpaid</p>}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <p className="text-sm text-muted-foreground">
          {djs((createdAt as Timestamp).toDate()).format(DEFAULT_DATE_FORMAT)}
        </p>
        <Button variant="secondary" size="sm" asChild>
          <Link href={`${ROUTES.APP.EXPENSES}/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
