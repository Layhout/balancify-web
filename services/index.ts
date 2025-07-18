import { ExpenseService } from './expense'
import { GroupService } from './group'
import { DashboardService } from './dashboard'

const services = {
  group: new GroupService(),
  expense: new ExpenseService(),
  dashboard: new DashboardService(),
}

export { services }
