import { FIREBASE_COLLTION_NAME } from '@/lib/constants'
import { firestore } from '@/lib/firestore'
import { store } from '@/repositories'
import { userAtom } from '@/repositories/user'
import { Noti } from '@/types/common'
import { limit, orderBy } from 'firebase/firestore'

export async function sendNotiToUser({ noti, receiverId }: { receiverId: string; noti: Noti }) {
  await firestore.setData(`${FIREBASE_COLLTION_NAME.NOTIS}/${receiverId}/data`, noti.id, noti)
}

export async function readNoti({ notis }: { notis: Noti[] }) {
  const userId = store.get(userAtom)?.id

  if (!userId) return

  firestore.updateMultipleData(
    notis.map((n) => ({
      collectionName: `${FIREBASE_COLLTION_NAME.NOTIS}/${userId}/data`,
      id: n.id,
      data: <Partial<Noti>>{ read: true },
    })),
  )
}

export async function getNotis(): Promise<Noti[]> {
  const userId = store.get(userAtom)?.id

  if (!userId) return []

  const foundNotis: Noti[] | null = await firestore.getQueryData(`${FIREBASE_COLLTION_NAME.NOTIS}/${userId}/data`, [
    orderBy('createdAt', 'desc'),
    orderBy('read', 'asc'),
    limit(10),
  ])

  return foundNotis || []
}
