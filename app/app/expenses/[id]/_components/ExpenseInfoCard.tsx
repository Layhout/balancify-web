import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { MemberListDrawer } from './MemberListDrawer'
import { ExpenseDetails } from '@/services/expense.model'
import { ExpenseInfoCardPlaceholder } from './ExpenseInfoCardPlaceholder'
import { useMemo } from 'react'
import { ExpenseAvatar } from '@/components/ExpenseAvatar'

type ExpenseInfoCardProps = {
  loading: boolean
  details?: ExpenseDetails
}

export function ExpenseInfoCard({ loading, details }: ExpenseInfoCardProps) {
  const settledPercentage = useMemo(
    () => (details ? Math.min(Math.round((details.totalOwe / details.totalCost) * 100), 100) : 0),
    [details],
  )

  if (loading) return <ExpenseInfoCardPlaceholder />

  return (
    <Card>
      <CardContent className="flex flex-col-reverse items-center gap-4 p-6 md:flex-row md:items-start">
        <div className="flex-1 self-stretch">
          <div className="text-center md:text-left">
            <h1 className="text-xl font-bold capitalize">{details?.name}</h1>
            <p className="text-xs text-muted-foreground">
              Added by {details?.createdByYou ? 'You' : details?.createdBy}
              {' • '}
              {details?.createdAt}
            </p>
          </div>
          <div className="mt-8 flex flex-col items-center gap-8 md:mt-10 md:flex-row md:items-start md:gap-0">
            <div className="flex-1">
              <h1 className="hidden text-sm text-muted-foreground md:block">Total</h1>
              <h1 className="text-3xl font-bold md:text-xl">${details?.totalCost}</h1>
            </div>
            <div className="flex flex-[2] items-center justify-evenly self-stretch text-center md:justify-start md:text-left">
              {details?.createdByYou ? null : (
                <div className="flex-1">
                  <h1 className="text-xs text-muted-foreground md:text-sm">You Owed</h1>
                  <h1 className="text-xl font-bold">${details?.totalOwe}</h1>
                </div>
              )}
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
      <CardFooter className="flex gap-2 md:hidden">
        <div className="flex-1">
          <MemberListDrawer loading={loading} members={details?.members || []} />
        </div>
        <div className="flex-1">
          <Button className="w-full">Settle up</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
