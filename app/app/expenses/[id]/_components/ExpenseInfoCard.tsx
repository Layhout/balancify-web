import { Card, CardContent } from '@/components/ui/card'
import { ExpenseInfoCardPlaceholder } from './ExpenseInfoCardPlaceholder'
import { ExpenseAvatar } from '@/components/ExpenseAvatar'
import { Expense } from '@/types/common'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/repositories/user'
import { Timestamp } from 'firebase/firestore'
import { DEFAULT_DATE_FORMAT } from '@/lib/constants'
import { djs } from '@/lib/dayjsExt'

type ExpenseInfoCardProps = {
  loading: boolean
  details: Expense | null
}

export function ExpenseInfoCard({ loading, details }: ExpenseInfoCardProps) {
  const localUser = useAtomValue(userAtom)

  const settledPercentage = details
    ? Math.round((Object.values(details.member).reduce((p, c) => p + (c.settledAmount || 0), 0) / details.amount) * 100)
    : 0

  if (loading || !details) return <ExpenseInfoCardPlaceholder />

  return (
    <Card>
      <CardContent className="flex flex-col-reverse items-center gap-4 p-6 md:flex-row md:items-start">
        <div className="flex-1 self-stretch">
          <div className="text-center md:text-left">
            <h1 className="text-xl font-bold capitalize">{details.name}</h1>
            <p className="text-xs text-muted-foreground">
              Paid by {details.paidBy.id === localUser?.id ? 'You' : details.paidBy.name}
              {' • '}
              {djs((details.createdAt as Timestamp).toDate()).format(DEFAULT_DATE_FORMAT)}
            </p>
          </div>
          <div className="mt-8 flex flex-col items-center gap-8 md:mt-10 md:flex-row md:items-start md:gap-0">
            <div className="flex-1">
              <h1 className="hidden text-sm text-muted-foreground md:block">Total</h1>
              <h1 className="text-3xl font-bold md:text-xl">${details.amount}</h1>
            </div>
            <div className="flex flex-[2] items-center justify-evenly self-stretch text-center md:justify-start md:text-left">
              <div className="flex-1">
                <h1 className="text-xs text-muted-foreground md:text-sm">You Owed</h1>
                <h1 className="text-xl font-bold">${details.member[localUser?.id || '']?.amount}</h1>
              </div>
              <div className="flex-1">
                <h1 className="text-xs text-muted-foreground md:text-sm">Settled</h1>
                <h1 className="text-xl font-bold">{settledPercentage}%</h1>
              </div>
            </div>
          </div>
        </div>
        <ExpenseAvatar
          iconBgColor={details?.iconBgColor || ''}
          icon={details?.icon || ''}
          className="h-24 w-24"
          iconClassName="h-16 w-16"
        />
      </CardContent>
    </Card>
  )
}
