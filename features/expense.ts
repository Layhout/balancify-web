import { countPerPage, FIREBASE_COLLTION_NAME, ROUTES } from '@/lib/constants'
import { deleteData, getQueryData, getTotalCount, setMultipleData } from '@/lib/firestore'
import { store } from '@/repositories'
import { userAtom } from '@/repositories/user'
import {
  Expense,
  ExpenseMember,
  ExpenseMetadata,
  MemberOption,
  NotiType,
  PaginatedResponse,
  SplitOption,
} from '@/types/common'
import {
  documentId,
  FieldValue,
  limit,
  orderBy,
  QueryConstraint,
  serverTimestamp,
  startAfter,
  where,
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { currencyFormatter, generateTrigrams } from '@/lib/utils'
import { createNoti } from './noti'
import { djs } from '@/lib/dayjsExt'

export async function createExpense({
  name,
  amount,
  icon,
  iconBgColor,
  memberOption,
  splitOption,
  group,
  members,
  alreadyPaid,
}: {
  name: string
  amount: number
  icon: string
  iconBgColor: string
  memberOption: MemberOption
  splitOption: SplitOption
  group?: { id: string; name: string }
  members: ExpenseMember[]
  alreadyPaid: boolean
}) {
  const user = store.get(userAtom)

  if (!user) return

  const timelines = [
    {
      createdAt: djs().valueOf(),
      createdBy: user,
      events: 'Created expense',
    },
  ]

  if (alreadyPaid) {
    timelines.push({
      createdAt: djs().valueOf(),
      createdBy: user,
      events: `Settled expense with amount ${currencyFormatter(amount)}`,
    })
  }

  const curServerTimestamp = serverTimestamp()

  const expense: Expense = {
    id: uuidv4(),
    name,
    createdAt: curServerTimestamp,
    amount,
    icon,
    iconBgColor,
    memberOption,
    splitOption,
    group,
    members,
    memberIds: members.map((m) => m.id),
    createdBy: user,
    timelines,
  }

  const expenseMetadata: ExpenseMetadata = {
    expenseId: expense.id,
    nameTrigrams: generateTrigrams(expense.name),
    membersFlag: expense.members.reduce((p, c) => ({ ...p, [c.id]: true }), {}),
  }

  await Promise.all([
    setMultipleData([
      {
        collectionName: FIREBASE_COLLTION_NAME.EXPENSES,
        id: expense.id,
        data: expense,
      },
      {
        collectionName: FIREBASE_COLLTION_NAME.EXPENSE_METADATA,
        id: expense.id,
        data: expenseMetadata,
      },
    ]),
    createNoti({
      title: 'New Expense',
      description: `${user.name} added a new expense.`,
      link: `${ROUTES.APP.EXPENSES}/${expense.id}`,
      type: NotiType.Group,
      ownerIds: members.map((m) => m.id),
    }),
  ])
}

export async function getExpenses({
  lastDocCreatedAt = null,
  search,
}: {
  lastDocCreatedAt: FieldValue | null
  search: string
}): Promise<PaginatedResponse<Expense>> {
  const userId = store.get(userAtom)?.id

  if (!userId) return { data: [], count: 0 }

  let expenseMetadata: ExpenseMetadata[] | null = null

  if (search) {
    expenseMetadata = (await getQueryData(FIREBASE_COLLTION_NAME.EXPENSE_METADATA, [
      where('nameTrigrams', 'array-contains-any', generateTrigrams(search)),
      where(`membersFlag.${userId}`, '==', true),
    ])) as ExpenseMetadata[]
  }

  if (expenseMetadata !== null && !expenseMetadata.length) return { data: [], count: 0 }

  const collectionPath = FIREBASE_COLLTION_NAME.EXPENSES

  const query: QueryConstraint[] = [where('memberIds', 'array-contains', userId), orderBy('createdAt', 'desc')]

  if (expenseMetadata) query.push(where(documentId(), 'in', expenseMetadata?.map((e) => e.expenseId) || []))

  const count = await getTotalCount(collectionPath, query)
  if (!count) return { data: [], count: 0 }

  if (lastDocCreatedAt) query.push(startAfter(lastDocCreatedAt))

  query.push(limit(countPerPage))

  const expenses: Expense[] | null = await getQueryData(collectionPath, query)

  return { data: expenses || [], count }
}

export async function getExpenseDetail(id: string): Promise<Expense | null> {
  if (!id) return null

  const userId = store.get(userAtom)?.id

  if (!userId) return null

  const collectionPath = FIREBASE_COLLTION_NAME.EXPENSES

  const expense: Expense[] | null = await getQueryData(collectionPath, [
    where(documentId(), '==', id),
    where('memberIds', 'array-contains', userId),
  ])

  if (!expense?.length) return null

  return expense[0]
}

export async function deleteExpense({ id }: { id: string }) {
  const userId = store.get(userAtom)?.id

  if (!userId) return

  await Promise.all([
    deleteData(FIREBASE_COLLTION_NAME.EXPENSES, id),
    deleteData(FIREBASE_COLLTION_NAME.EXPENSE_METADATA, id),
  ])
}
