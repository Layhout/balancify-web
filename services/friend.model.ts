import { Person } from './group.model'
import { ResponseResultWithPagination } from './types'

export type FriendResult = ResponseResultWithPagination<Person[]>
