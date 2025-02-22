import { Person } from './group.model'
import { ResponseResult, ResponseResultWithPagination } from './types'

export type Expense = {
  name: string
  createdAt: string
  totalCost: number
  totalOwe: number
  members: Person[]
  hasSettled: boolean
  createdBy: string
  icon: string
  iconBgColor: string
  createdByYou: boolean
  id: string
}

export type ExpenseListResult = ResponseResultWithPagination<Expense[]>

export type Timeline = {
  createdAt: string
  createdBy: Person
  events: string
}

export type ExpenseDetailsMember = { ownedAmount: number } & Person

export type ExpenseDetails = { timelines: Timeline[]; members: ExpenseDetailsMember[] } & Omit<Expense, 'members'>

export type ExpenseDetailsResult = ResponseResult<ExpenseDetails>
