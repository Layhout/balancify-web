import { FieldValue } from 'firebase/firestore'

export interface User {
  id: string
  imageUrl?: string
  profileBgColor: string
  email: string
  name: string
  oneSignalId?: string
  referalCode: string
}

export enum FriendStatusEnum {
  Accepted = 'accepted',
  Pending = 'pending',
  Rejected = 'rejected',
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
}

export interface Noti {
  id: string
  type: NotiType
  title: string
  description: string
  link: string
  read: boolean
  createdAt: FieldValue
  metadata?: Record<string, any>
}

export interface PaginatedResponse<T> {
  count: number
  data: T[]
}

export interface GroupMember {
  userId: string
  name: string
  imageUrl?: string
  profileBgColor: string
}

export interface GroupExpense {
  expenseId: string
  name: string
}

export interface Group {
  id: string
  name: string
  description?: string
  nameTrigrams: string[]
  createdAt: FieldValue
  members: GroupMember[]
  totalExpenses: number
  expenses: GroupExpense[]
}
