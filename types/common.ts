import { FieldValue } from 'firebase/firestore'

export interface User {
  id: string
  imageUrl?: string
  profileBgColor?: string
  email: string
  name: string
  oneSignalId?: string
  referalCode?: string
}

export enum FriendStatusEnum {
  Accepted = 'accepted',
  Pending = 'pending',
  Rejected = 'rejected',
  Requesting = 'requesting',
}

export interface Friend {
  id: string
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
