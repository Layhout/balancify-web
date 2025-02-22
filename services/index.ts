import ExpenseService from './expense'
import FriendService from './friend'
import GroupService from './group'

const services = {
  group: new GroupService(),
  expense: new ExpenseService(),
  friend: new FriendService(),
}

export default services
