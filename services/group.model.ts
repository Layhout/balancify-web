import { User } from '@/types/common'
import { Expense } from './expense.model'
import { GetListParams, ResponseResult, ResponseResultWithPagination } from './types'

export type Group = {
  id: string
  name: string
  members: User[]
  totalSpent: string
  createdAt: string
}

export type GroupListParams = {
  q?: string
}

export type GetGroupListParams = GetListParams<GroupListParams>
export type GroupListResult = ResponseResultWithPagination<Group[]>

export type GroupDetails = { expenses: Expense[]; description: string } & Group

export type GroupDetailsResult = ResponseResult<GroupDetails>
