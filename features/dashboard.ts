import { getQueryData } from '@/lib/firestore'
import { FIREBASE_COLLTION_NAME, STANDARD_DATE_FORMAT } from '@/lib/constants'
import { where, QueryConstraint, Timestamp } from 'firebase/firestore'
import { userAtom } from '@/repositories/user'
import { Dashboard, Expense } from '@/types/common'
import { store } from '@/repositories'
import { djs } from '@/lib/dayjsExt'

export async function getDashboardData(): Promise<Dashboard | null> {
  const userId = store.get(userAtom)?.id

  if (!userId) return null

  const query: QueryConstraint[] = [
    where('memberIds', 'array-contains', userId),
    where('createdAt', '>=', djs().subtract(3, 'months').toDate()),
  ]

  const expenses: Expense[] | null = await getQueryData(FIREBASE_COLLTION_NAME.EXPENSES, query)

  if (!expenses?.length) return null

  const { getBack, owed, spendingHistory } = expenses.reduce<{
    getBack: number
    owed: number
    spendingHistory: Record<string, number>
  }>(
    (p, c) => {
      if (c.paidBy.id === userId) {
        p.getBack += c.amount - c.member[userId].amount
      } else {
        p.owed += c.member[userId].amount - c.member[userId].settledAmount
      }

      p.spendingHistory[djs((c.createdAt as Timestamp).toDate()).format(STANDARD_DATE_FORMAT)] ??= 0

      p.spendingHistory[djs((c.createdAt as Timestamp).toDate()).format(STANDARD_DATE_FORMAT)] +=
        c.member[userId].amount

      return p
    },
    { getBack: 0, owed: 0, spendingHistory: {} },
  )

  return {
    getBack,
    owed,
    expenses,
    spendingHistory: Object.entries(spendingHistory).map(([createdAt, amount]) => ({ createdAt, amount })),
  }
}
