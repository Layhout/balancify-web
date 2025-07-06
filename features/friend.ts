import { Friend, FriendStatusEnum, Notification, User } from '@/types/common'
import feature from '.'
import { firestore } from '@/lib/firestore'
import { FIREBASE_COLLTION_NAME, ROUTES } from '@/lib/constants'

const addFriendToUserByEmail = async ({
  userId,
  username,
  friendEmail,
}: {
  userId: string
  username: string
  friendEmail: string
}) => {
  const foundUser: User | null = await feature.user.findUserByEmail(friendEmail)

  if (!foundUser) {
    throw new Error('USER404')
  }

  const friend: Friend = {
    id: foundUser.id,
    status: FriendStatusEnum.Pending,
  }

  const notification: Notification = {
    title: 'New Friend Request',
    description: `${username} sent your a firend request.`,
    link: ROUTES.APP.FRIENDS,
    read: false,
  }

  firestore.setData(FIREBASE_COLLTION_NAME.FRIENDS, userId, [friend])
  firestore.setData(FIREBASE_COLLTION_NAME.NOTIFICATION, friend.id, [notification])
}

const addFriendByReferalCode = async ({ userId, referalCode }: { userId: string; referalCode: string }) => {
  const foundFriend: User | null = await feature.user.findUserByReferalCode(referalCode)

  if (!foundFriend) {
    throw new Error('USER404')
  }

  await firestore.setData(FIREBASE_COLLTION_NAME.FRIENDS, userId, [foundFriend.id])
}

const friend = { addFriendByReferalCode, addFriendToUserByEmail }

export { friend }
