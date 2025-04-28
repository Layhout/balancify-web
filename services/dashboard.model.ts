import { Expense } from './expense.model'
import { ResponseResult } from './types'

export type SpendingHistory = {
  date: string
  amount: number
}

export type Dashboard = {
  getBack: number
  owed: number
  spendingHistory: SpendingHistory[]
  toBeSettled: Expense[]
}

export type DashboardResult = ResponseResult<Dashboard>
