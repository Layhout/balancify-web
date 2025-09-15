import { FIREBASE_COLLTION_NAME } from '@/lib/constants'
import { getData, getQueryData, setData, updateData } from '@/lib/firestore'
import { store } from '@/repositories'
import { userAtom } from '@/repositories/user'
import { User } from '@/types/common'
import { limit, where, serverTimestamp } from 'firebase/firestore'

export async function createUser(user: User) {
  return await setData(FIREBASE_COLLTION_NAME.USERS, user.id, { ...user, createdAt: serverTimestamp() })
}

export async function updateUser({ user }: { user: Partial<User> }) {
  const userId = store.get(userAtom)?.id

  if (!userId) throw new Error()

  return await updateData(FIREBASE_COLLTION_NAME.USERS, userId, user)
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const [foundUser]: User[] = await getQueryData(FIREBASE_COLLTION_NAME.USERS, [where('email', '==', email), limit(1)])

  return foundUser || null
}

export async function findUserById(id: string): Promise<User | null> {
  const foundUser: User | null = await getData(FIREBASE_COLLTION_NAME.USERS, id)

  return foundUser || null
}

export async function findUserByReferalCode(code: string): Promise<User | null> {
  const [foundUser]: User[] = await getQueryData(FIREBASE_COLLTION_NAME.USERS, [
    where('referalCode', '==', code),
    limit(1),
  ])

  return foundUser || null
}
