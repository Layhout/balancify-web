import { countPerPage, FIREBASE_COLLTION_NAME, ROUTES } from '@/lib/constants'
import {
  deleteData,
  getQueryData,
  getTotalCount,
  setMultipleData,
  updateData,
  updateMultipleData,
} from '@/lib/firestore'
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
  Timeline,
  User,
} from '@/types/common'
import {
  arrayUnion,
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

interface CreateExpenseParams {
  name: string
  amount: number
  icon: string
  iconBgColor: string
  memberOption: MemberOption
  splitOption: SplitOption
  group?: { id: string; name: string }
  members: ExpenseMember[]
  paidBy: User
  apiToken?: string | null
}

export async function createExpense({
  name,
  amount,
  icon,
  iconBgColor,
  memberOption,
  splitOption,
  group,
  members,
  paidBy,
  apiToken,
}: CreateExpenseParams) {
  const user = store.get(userAtom)

  if (!user) return

  const timelines = [
    {
      createdAt: djs().valueOf(),
      createdBy: paidBy,
      events: 'Paid for this expense',
    },
    {
      createdAt: djs().valueOf(),
      createdBy: user,
      events: 'Created expense',
    },
  ]

  const membersFlag = members.reduce((p, c) => ({ ...p, [c.id]: true }), {})

  const expense: Expense = {
    id: uuidv4(),
    name,
    createdAt: serverTimestamp(),
    amount,
    icon,
    iconBgColor,
    memberOption,
    splitOption,
    group: group || null,
    member: members.reduce((p, c) => ({ ...p, [c.id]: c }), {}),
    membersFlag,
    createdBy: user,
    paidBy,
    timelines,
  }

  expense.member[paidBy.id].settledAmount = expense.member[paidBy.id].amount

  const expenseMetadata: ExpenseMetadata = {
    expenseId: expense.id,
    nameTrigrams: generateTrigrams(expense.name),
    membersFlag,
  }

  await setMultipleData([
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
  ])

  await createNoti({
    title: 'New Expense',
    description: `${user.name} added a new expense.`,
    link: `${ROUTES.APP.EXPENSES}/${expense.id}`,
    type: NotiType.Expense,
    owners: members,
    accessToken: apiToken,
  })
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

  const query: QueryConstraint[] = [orderBy('createdAt', 'desc')]

  if (expenseMetadata) query.push(where(documentId(), 'in', expenseMetadata?.map((e) => e.expenseId) || []))
  else query.push(where(`membersFlag.${userId}`, '==', true))

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

  const sortedTimelines = expense[0].timelines.slice().sort((a, b) => (djs(a.createdAt).isAfter(b.createdAt) ? -1 : 1))

  return {
    ...expense[0],
    timelines: sortedTimelines,
  }
}

export async function deleteExpense({ id }: { id: string }) {
  const userId = store.get(userAtom)?.id

  if (!userId) return

  await Promise.all([
    deleteData(FIREBASE_COLLTION_NAME.EXPENSES, id),
    deleteData(FIREBASE_COLLTION_NAME.EXPENSE_METADATA, id),
  ])
}

export async function settleExpense({
  id,
  settledAmount,
  amount,
  receiverName,
}: {
  id: string
  settledAmount: number
  amount: number
  receiverName: string
}) {
  const user = store.get(userAtom)

  if (!user) return

  await updateData(FIREBASE_COLLTION_NAME.EXPENSES, id, {
    [`member.${user.id}.settledAmount`]: settledAmount + amount,
    timelines: arrayUnion({
      createdAt: djs().valueOf(),
      createdBy: user,
      events: `${user.name} pays ${receiverName} with amount ${currencyFormatter(amount)}`,
    }),
  })
}

export async function editExpense({
  id,
  name,
  amount,
  icon,
  iconBgColor,
  memberOption,
  splitOption,
  group,
  members,
  paidBy,
  timelines,
  previousPayer,
}: CreateExpenseParams & { id: string; timelines: Timeline[]; previousPayer: User }) {
  const user = store.get(userAtom)

  if (!user) return

  const membersFlag = members.reduce((p, c) => ({ ...p, [c.id]: true }), {})

  const expense: Partial<Expense> = {
    name,
    createdAt: serverTimestamp(),
    amount,
    icon,
    iconBgColor,
    memberOption,
    splitOption,
    group: group || null,
    member: members.reduce((p, c) => ({ ...p, [c.id]: c }), {}),
    membersFlag,
    paidBy,
    timelines: [
      {
        createdAt: djs().valueOf(),
        createdBy: user,
        events: 'Edited the expense',
      },
      ...timelines,
    ],
  }

  if (previousPayer.id !== paidBy.id) {
    expense.member![paidBy.id].settledAmount += expense.member![paidBy.id].amount

    if (expense.member![previousPayer.id]) {
      expense.member![previousPayer.id].settledAmount -= expense.member![previousPayer.id].amount
    }
  }

  const expenseMetadata: Partial<ExpenseMetadata> = {
    nameTrigrams: generateTrigrams(expense.name!),
    membersFlag,
  }

  await updateMultipleData([
    {
      collectionName: FIREBASE_COLLTION_NAME.EXPENSES,
      id,
      data: expense,
    },
    {
      collectionName: FIREBASE_COLLTION_NAME.EXPENSE_METADATA,
      id,
      data: expenseMetadata,
    },
  ])
}

export async function getExpenseForGroup({
  id,
  lastDocCreatedAt,
}: {
  id: string
  lastDocCreatedAt: FieldValue | null
}): Promise<PaginatedResponse<Expense>> {
  const user = store.get(userAtom)

  if (!user) return { data: [], count: 0 }

  const query: QueryConstraint[] = [where('group.id', '==', id), orderBy('createdAt', 'desc')]

  const count = await getTotalCount(FIREBASE_COLLTION_NAME.EXPENSES, query)
  if (!count) return { data: [], count: 0 }

  if (lastDocCreatedAt) query.push(startAfter(lastDocCreatedAt))

  query.push(limit(countPerPage))

  const expenses: Expense[] | null = await getQueryData(FIREBASE_COLLTION_NAME.EXPENSES, query)

  return { data: expenses || [], count }
}
