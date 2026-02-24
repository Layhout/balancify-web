import { FieldValue } from 'firebase/firestore'

export interface User {
  id: string
  imageUrl?: string
  profileBgColor: string
  email: string
  name: string
  notiToken: string
  referalCode: string
  subNoti?: boolean
}

export enum FriendStatusEnum {
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  UNFRIEND = 'UNFRIEND',
  REQUESTING = 'REQUESTING',
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
  membersFlag: Record<string, true>
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
  SplitEqually = 'split_equally',
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
  group: { id: string; name: string } | null
  member: Record<string, ExpenseMember>
  membersFlag: Record<string, true>
  createdBy: User
  paidBy: User
  timelines: Timeline[]
}

export interface ExpenseMetadata {
  expenseId: string
  nameTrigrams: string[]
  membersFlag: Record<string, true>
}

export interface Dashboard {
  expenses: Expense[]
  getBack: number
  owed: number
  spendingHistory: { amount: number; createdAt: string }[]
}
