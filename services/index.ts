import ExpenseService from './expense'
import FriendService from './friend'
import GroupService from './group'
import DashboardService from './dashboard'

const services = {
  group: new GroupService(),
  expense: new ExpenseService(),
  friend: new FriendService(),
  dashboard: new DashboardService(),
}

export { services }
