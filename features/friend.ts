import { Friend, FriendResponse, FriendStatusEnum, Noti, NotiType, PaginatedResponse, User } from '@/types/common'
import feature from '.'
import { firestore } from '@/lib/firestore'
import { countPerPage, FIREBASE_COLLTION_NAME, ROUTES, USER_404_MSG, YOURSELF_AS_FRIEND_MSG } from '@/lib/constants'
import { documentId, limit, orderBy, QueryConstraint, serverTimestamp, startAfter, where } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { generateTrigrams, randomNumBetween } from '@/lib/utils'
import { store } from '@/repositories'
import { userAtom } from '@/repositories/user'

const addFriendToUserByEmail = async ({ friendEmail }: { friendEmail: string }) => {
  const user = store.get(userAtom)

  if (!user) return

  const foundUser: User | null = await feature.user.findUserByEmail(friendEmail)

  if (!foundUser) {
    throw new Error(USER_404_MSG[randomNumBetween(0, USER_404_MSG.length - 1)])
  }

  const curServerTimestamp = serverTimestamp()

  const friend: Friend = {
    userId: foundUser.id,
    name: foundUser.name,
    status: FriendStatusEnum.Pending,
    createdAt: curServerTimestamp,
    nameTrigrams: generateTrigrams(foundUser.name),
  }

  const youAsfriend: Friend = {
    userId: user.id,
    name: user.name,
    status: FriendStatusEnum.Requesting,
    createdAt: curServerTimestamp,
    nameTrigrams: generateTrigrams(user.name),
  }

  const notification: Noti = {
    id: uuidv4(),
    type: NotiType.FriendRequest,
    title: 'New Friend Request',
    description: `${user.name} sent you a firend request.`,
    link: ROUTES.APP.FRIENDS,
    read: false,
    createdAt: curServerTimestamp,
  }

  firestore.setMultipleData([
    {
      collectionName: `${FIREBASE_COLLTION_NAME.FRIENDS}/${user.id}/data`,
      id: friend.userId,
      data: friend,
    },
    {
      collectionName: `${FIREBASE_COLLTION_NAME.FRIENDS}/${friend.userId}/data`,
      id: user.id,
      data: youAsfriend,
    },
    {
      collectionName: `${FIREBASE_COLLTION_NAME.NOTIS}/${friend.userId}/data`,
      id: notification.id,
      data: notification,
    },
  ])
}

const addFriendByReferalCode = async ({ referalCode }: { referalCode: string }) => {
  const user = store.get(userAtom)

  if (!user) return

  const foundFriend: User | null = await feature.user.findUserByReferalCode(referalCode)

  if (!foundFriend) {
    throw new Error(USER_404_MSG[randomNumBetween(0, USER_404_MSG.length - 1)])
  }

  if (user.id === foundFriend.id) {
    throw new Error(YOURSELF_AS_FRIEND_MSG[randomNumBetween(0, YOURSELF_AS_FRIEND_MSG.length - 1)])
  }

  const curServerTimestamp = serverTimestamp()

  const friend: Friend = {
    userId: foundFriend.id,
    name: foundFriend.name,
    status: FriendStatusEnum.Accepted,
    createdAt: curServerTimestamp,
    nameTrigrams: generateTrigrams(foundFriend.name),
  }

  const youAsfriend: Friend = {
    userId: user.id,
    name: user.name,
    status: FriendStatusEnum.Accepted,
    createdAt: curServerTimestamp,
    nameTrigrams: generateTrigrams(user.name),
  }

  firestore.setMultipleData([
    {
      collectionName: `${FIREBASE_COLLTION_NAME.FRIENDS}/${user.id}/data`,
      id: friend.userId,
      data: friend,
    },
    {
      collectionName: `${FIREBASE_COLLTION_NAME.FRIENDS}/${foundFriend.id}/data`,
      id: user.id,
      data: youAsfriend,
    },
  ])
}

const acceptFriendRequest = async ({ friendUserId }: { friendUserId: string }) => {
  const userId = store.get(userAtom)?.id

  if (!userId) return

  firestore.updateData(`${FIREBASE_COLLTION_NAME.FRIENDS}/${userId}/data`, friendUserId, <Partial<Friend>>{
    status: FriendStatusEnum.Accepted,
  })
}

const rejectFriendRequest = async ({ friendUserId }: { friendUserId: string }) => {
  const userId = store.get(userAtom)?.id

  if (!userId) return

  firestore.updateData(`${FIREBASE_COLLTION_NAME.FRIENDS}/${userId}/data`, friendUserId, <Partial<Friend>>{
    status: FriendStatusEnum.Rejected,
  })
}

const getFriends = async ({
  lastDocCreatedAt = null,
  search,
}: {
  lastDocCreatedAt: Friend['createdAt'] | null
  search: string
}): Promise<PaginatedResponse<FriendResponse>> => {
  const userId = store.get(userAtom)?.id

  if (!userId) return { data: [], count: 0 }

  const collectionPath = `${FIREBASE_COLLTION_NAME.FRIENDS}/${userId}/data`

  const query: QueryConstraint[] = [where('status', '!=', FriendStatusEnum.Rejected), orderBy('createdAt', 'desc')]

  if (lastDocCreatedAt) query.push(startAfter(lastDocCreatedAt), limit(countPerPage))
  else query.push(limit(countPerPage))

  if (search) query.unshift(where('nameTrigrams', 'array-contains-any', generateTrigrams(search)))

  const count = await firestore.getTotalCount(collectionPath, query)
  if (!count) return { data: [], count: 0 }

  const friends: Friend[] | null = await firestore.getQueryData(collectionPath, query)
  const users: User[] | null = await firestore.getQueryData(FIREBASE_COLLTION_NAME.USERS, [
    where(
      documentId(),
      'in',
      (friends || []).map((f) => f.userId),
    ),
  ])
  const result = friends.map((f) => ({ ...users.find((u) => u.id === f.userId), ...f })) as FriendResponse[]

  return { data: result || [], count }
}

const friend = { addFriendByReferalCode, addFriendToUserByEmail, acceptFriendRequest, rejectFriendRequest, getFriends }

export { friend }
