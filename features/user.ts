import { FIREBASE_COLLTION_NAME } from '@/lib/constants'
import { firestore } from '@/lib/firestore'
import { User } from '@/types/common'
import { limit, where } from 'firebase/firestore'

const createUser = (user: User) => {
  return firestore.setData(FIREBASE_COLLTION_NAME.USERS, user.id, user)
}

const updateUser = ({ id, user }: { id: string; user: Partial<User> }) => {
  return firestore.updateData(FIREBASE_COLLTION_NAME.USERS, id, user)
}

const findUserByEmail = async (email: string): Promise<User | null> => {
  const [foundUser]: User[] = await firestore.getQueryData(FIREBASE_COLLTION_NAME.USERS, [
    where('email', '==', email),
    limit(1),
  ])

  return foundUser || null
}

const findUserById = async (id: string): Promise<User | null> => {
  const foundUser: User | null = await firestore.getData(FIREBASE_COLLTION_NAME.USERS, id)

  return foundUser || null
}

const findUserByReferalCode = async (code: string): Promise<User | null> => {
  const [foundUser]: User[] = await firestore.getQueryData(FIREBASE_COLLTION_NAME.USERS, [
    where('referalCode', '==', code),
    limit(1),
  ])

  return foundUser || null
}

const user = { createUser, findUserByEmail, updateUser, findUserById, findUserByReferalCode }

export { user }
