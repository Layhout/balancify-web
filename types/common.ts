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
}

export interface Friend {
  id: string
  status: FriendStatusEnum
}

export interface Notification {
  title: string
  description: string
  link: string
  read: boolean
}
