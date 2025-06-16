import { User } from '@/types/common'
import feature from '.'
import { firestore } from '@/lib/firestore'
import { FIREBASE_COLLTION_NAME } from '@/lib/constants'

const addFriendToUserByEmail = async ({ userId, friendEmail }: { userId: string; friendEmail: string }) => {
  const foundUser: User | null = await feature.user.findUserByEmail(friendEmail)

  if (!foundUser) {
    throw new Error('USER404')
  }

  return firestore.setData(FIREBASE_COLLTION_NAME.FRIENDS, userId, [foundUser])
}

const getFriends = (): User[] => {
  return []
}

const friend = { getFriends, addFriendToUserByEmail }

export { friend }
