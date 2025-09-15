import { Friend, FriendResponse, FriendStatusEnum, NotiType, PaginatedResponse, User } from '@/types/common'
import {
  countPerPage,
  FIREBASE_COLLTION_NAME,
  ROUTES,
  USER_404_MSG,
  YOURSELF_AS_FRIEND_MSG,
  FRIEND_ALREADY_EXISTS_MSG,
} from '@/lib/constants'
import { documentId, limit, orderBy, QueryConstraint, serverTimestamp, startAfter, where } from 'firebase/firestore'
import { generateTrigrams, randomNumBetween } from '@/lib/utils'
import { store } from '@/repositories'
import { userAtom } from '@/repositories/user'
import { findUserByEmail, findUserByReferalCode } from './user'
import { createNoti } from './noti'
import { deleteData, getData, getQueryData, getTotalCount, setMultipleData, updateData } from '@/lib/firestore'

export async function addFriendToUserByEmail({
  friendEmail,
  apiToken,
}: {
  friendEmail: string
  apiToken?: string | null
}) {
  const user = store.get(userAtom)

  if (!user) return

  const foundUser: User | null = await findUserByEmail(friendEmail)

  if (!foundUser) {
    throw new Error(USER_404_MSG[randomNumBetween(0, USER_404_MSG.length - 1)], { cause: 404 })
  }

  const foundFriend: Friend | null = await getData(`${FIREBASE_COLLTION_NAME.FRIENDS}/${user.id}/data`, foundUser.id)

  if (foundFriend) {
    throw new Error(FRIEND_ALREADY_EXISTS_MSG[randomNumBetween(0, FRIEND_ALREADY_EXISTS_MSG.length - 1)], {
      cause: 409,
    })
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

  await createNoti({
    title: 'New Friend Request',
    description: `${user.name} sent you a firend request.`,
    link: ROUTES.APP.FRIENDS,
    type: NotiType.FriendRequest,
    owners: [foundUser],
    accessToken: apiToken,
  })

  await setMultipleData([
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
  ])
}

export async function addFriendByReferalCode({ referalCode }: { referalCode: string }) {
  const user = store.get(userAtom)

  if (!user) return

  const foundFriend: User | null = await findUserByReferalCode(referalCode)

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

  await setMultipleData([
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

export async function acceptFriendRequest({ friendUserId }: { friendUserId: string }) {
  const userId = store.get(userAtom)?.id

  if (!userId) return

  await updateData(`${FIREBASE_COLLTION_NAME.FRIENDS}/${userId}/data`, friendUserId, <Partial<Friend>>{
    status: FriendStatusEnum.Accepted,
  })
}

export async function rejectFriendRequest({ friendUserId }: { friendUserId: string }) {
  const userId = store.get(userAtom)?.id

  if (!userId) return

  await updateData(`${FIREBASE_COLLTION_NAME.FRIENDS}/${userId}/data`, friendUserId, <Partial<Friend>>{
    status: FriendStatusEnum.Rejected,
  })
}

export async function getFriends({
  lastDocCreatedAt = null,
  search,
}: {
  lastDocCreatedAt: Friend['createdAt'] | null
  search: string
}): Promise<PaginatedResponse<FriendResponse>> {
  const userId = store.get(userAtom)?.id

  if (!userId) return { data: [], count: 0 }

  const collectionPath = `${FIREBASE_COLLTION_NAME.FRIENDS}/${userId}/data`

  const query: QueryConstraint[] = [where('status', '!=', FriendStatusEnum.Rejected), orderBy('createdAt', 'desc')]

  if (search) query.unshift(where('nameTrigrams', 'array-contains-any', generateTrigrams(search)))

  const count = await getTotalCount(collectionPath, query)
  if (!count) return { data: [], count: 0 }

  if (lastDocCreatedAt) query.push(startAfter(lastDocCreatedAt))

  query.push(limit(countPerPage))

  const friends: Friend[] | null = await getQueryData(collectionPath, query)
  const users: User[] | null = await getQueryData(FIREBASE_COLLTION_NAME.USERS, [
    where(
      documentId(),
      'in',
      (friends || []).map((f) => f.userId),
    ),
  ])
  const result = friends.map((f) => ({ ...users.find((u) => u.id === f.userId), ...f })) as FriendResponse[]

  return { data: result || [], count }
}

export async function unFriend({ friendUserId }: { friendUserId: string }) {
  const userId = store.get(userAtom)?.id

  if (!userId) return

  await deleteData(`${FIREBASE_COLLTION_NAME.FRIENDS}/${userId}/data`, friendUserId)
}
