import { FIREBASE_COLLTION_NAME } from '@/lib/constants'
import { firestore } from '@/lib/firestore'
import { User } from '@/types/common'
import { limit, where } from 'firebase/firestore'

const saveUser = (user: User) => {
  return firestore.setData(FIREBASE_COLLTION_NAME.USERS, user.id, user)
}

const findUserByEmail = async (email: string): Promise<User | null> => {
  const [foundUser]: User[] = await firestore.getQueryData(FIREBASE_COLLTION_NAME.USERS, [
    where('email', '==', email),
    limit(1),
  ])

  return foundUser || null
}

const user = { saveUser, findUserByEmail }

export { user }
