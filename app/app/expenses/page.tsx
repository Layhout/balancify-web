'use client'

import { Button } from '@/components/ui/button'
import { LuLoaderCircle, LuPlus } from 'react-icons/lu'
import { useExpense } from './_hooks/useExpense'
import { ExpenseWrapper } from './_components/ExpenseWrapper'
import { ExpenseCard } from './_components/ExpenseCard'
import Link from 'next/link'
import { PageHeader } from '@/components/PageHeader'
import { ROUTES } from '@/lib/constants'
import { useAtomValue } from 'jotai'
import { isDesktopAtom } from '@/repositories/layout'
import { Empty } from '@/components/Empty'

export default function Expenses() {
  const { expenseQuery, expenseData, setSearch } = useExpense()
  const isDesktop = useAtomValue(isDesktopAtom)

  return (
    <div className="container pb-4">
      <PageHeader
        title="Expenses"
        hasBackBtn={!isDesktop}
        onSearch={setSearch}
        hasSearch
        action={
          <Button className="gap-2" asChild>
            <Link href={ROUTES.APP.EXPENSES_FORM}>
              <LuPlus className="h-4 w-4" /> Add Expense
            </Link>
          </Button>
        }
      />
      {expenseQuery.isFetching || expenseData.length ? (
        <>
          <ExpenseWrapper loading={expenseQuery.isFetching && !expenseQuery.isFetchingNextPage}>
            {expenseData.map((expense, i) => (
              <ExpenseCard key={i} {...expense} />
            ))}
          </ExpenseWrapper>
          {expenseQuery.hasNextPage && (
            <div className="mt-4 flex justify-center">
              <Button onClick={() => expenseQuery.fetchNextPage()} variant="secondary">
                {expenseQuery.isFetchingNextPage && <LuLoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Load More
              </Button>
            </div>
          )}
        </>
      ) : (
        <Empty />
      )}
    </div>
  )
}
