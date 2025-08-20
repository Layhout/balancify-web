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
