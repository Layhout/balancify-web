import { ResponseResult } from './types'

export type SpendingHistory = {
  date: string
  amount: number
}

export type Dashboard = {
  getBack: number
  owed: number
  spendingHistory: SpendingHistory[]
  toBeSettled: []
}

export type DashboardResult = ResponseResult<Dashboard>
