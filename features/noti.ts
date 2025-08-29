import { FIREBASE_COLLTION_NAME } from '@/lib/constants'
import { getQueryData, setData, updateMultipleData } from '@/lib/firestore'
import { store } from '@/repositories'
import { userAtom } from '@/repositories/user'
import { Noti, NotiType } from '@/types/common'
import { limit, serverTimestamp, where } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

export async function createNoti({
  title,
  description,
  link = '',
  type,
  ownerIds,
}: {
  title: string
  description: string
  link?: string
  type: NotiType
  ownerIds: string[]
}) {
  const userId = store.get(userAtom)?.id

  if (!userId) return

  const noti: Noti = {
    id: uuidv4(),
    title,
    description,
    link,
    type,
    userReadFlag: ownerIds.reduce((p, c) => ({ ...p, [c]: false }), {}),
    ownerIds,
    createdAt: serverTimestamp(),
  }

  await setData(FIREBASE_COLLTION_NAME.NOTIS, noti.id, noti)
}

export async function getUnreadNotis(): Promise<Noti[]> {
  const userId = store.get(userAtom)?.id

  if (!userId) return []

  const foundNotis: Noti[] | null = await getQueryData(FIREBASE_COLLTION_NAME.NOTIS, [
    where(`userReadFlag.${userId}`, '==', false),
    limit(10),
  ])

  return foundNotis || []
}

export async function readNoti({ notiIds }: { notiIds: string[] }) {
  const userId = store.get(userAtom)?.id

  if (!userId) return

  await updateMultipleData(
    notiIds.map((id) => ({
      collectionName: FIREBASE_COLLTION_NAME.NOTIS,
      id,
      data: <Partial<Noti>>{ userReadFlag: { [userId]: true } },
    })),
  )
}
