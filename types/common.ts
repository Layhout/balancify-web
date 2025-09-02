import { FieldValue } from 'firebase/firestore'

export interface User {
  id: string
  imageUrl?: string
  profileBgColor: string
  email: string
  name: string
  oneSignalId: string
  referalCode: string
}

export enum FriendStatusEnum {
  Accepted = 'accepted',
  Pending = 'pending',
  Rejected = 'rejected',
  Unfriend = 'unfriend',
  Requesting = 'requesting',
}

export interface Friend {
  userId: string
  name: string
  status: FriendStatusEnum
  createdAt: FieldValue
  nameTrigrams: string[]
}

export type FriendResponse = User & Friend

export enum NotiType {
  FriendRequest = 'friend-request',
  Group = 'group',
  Expense = 'expense',
}

export interface Noti {
  id: string
  type: NotiType
  title: string
  description: string
  link: string
  userReadFlag: Record<string, boolean>
  ownerIds: string[]
  createdAt: FieldValue
  metadata?: Record<string, any>
}

export interface PaginatedResponse<T> {
  count: number
  data: T[]
}

export interface Group {
  id: string
  name: string
  description?: string
  createdAt: FieldValue
  createdBy: string
  members: User[]
  memberIds: string[]
  totalExpenses: number
  expenses?: Record<string, any>[]
}

export type CurrencyCodes = 'USD' | 'KHR'

export interface GroupMetadata {
  groupId: string
  nameTrigrams: string[]
  membersFlag: Record<string, true>
}

export enum MemberOption {
  Group = 'group',
  Friend = 'friend',
}

export enum SplitOption {
  PaidEqually = 'paid_equally',
  PaidByYou = 'paid_by_you',
  PaidByThem = 'paid_by_them',
  Custom = 'custom',
}

export type ExpenseMember = User & { amount: number; settledAmount: number }

export interface Timeline {
  createdAt: number
  createdBy: User
  events: string
}

export interface Expense {
  id: string
  name: string
  createdAt: FieldValue
  amount: number
  icon: string
  iconBgColor: string
  memberOption: MemberOption
  splitOption: SplitOption
  group?: { id: string; name: string }
  members: ExpenseMember[]
  memberIds: string[]
  createdBy: User
  timelines: Timeline[]
}

export interface ExpenseMetadata {
  expenseId: string
  nameTrigrams: string[]
  membersFlag: Record<string, true>
}
