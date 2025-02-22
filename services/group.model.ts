import { Expense } from './expense.model'
import { GetListParams, ResponseResult, ResponseResultWithPagination } from './types'

export type Group = {
  id: string
  name: string
  members: Person[]
  totalSpent: string
  createdAt: string
}

export type Person = {
  id: string
  firstName: string
  lastName: string
  imageUrl?: string
  profileBgColor?: string
  email: string
}

export type GroupListParams = {
  q?: string
}

export type GetGroupListParams = GetListParams<GroupListParams>
export type GroupListResult = ResponseResultWithPagination<Group[]>

export type GroupDetails = { expenses: Expense[]; description: string } & Group

export type GroupDetailsResult = ResponseResult<GroupDetails>
