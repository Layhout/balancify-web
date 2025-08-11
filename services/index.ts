import { ExpenseService } from './expense'
import { DashboardService } from './dashboard'

const services = {
  expense: new ExpenseService(),
  dashboard: new DashboardService(),
}

export { services }
