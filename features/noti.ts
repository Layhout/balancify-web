import { countPerPage, FIREBASE_COLLTION_NAME } from '@/lib/constants'
import { getQueryData, getTotalCount, setData, updateMultipleData } from '@/lib/firestore'
import { store } from '@/repositories'
import { userAtom } from '@/repositories/user'
import { Noti, NotiType, PaginatedResponse, User } from '@/types/common'
import { limit, orderBy, QueryConstraint, serverTimestamp, startAfter, where } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

export async function createNoti({
  title,
  description,
  link = '',
  type,
  owners,
  accessToken,
}: {
  title: string
  description: string
  link?: string
  type: NotiType
  owners: User[]
  accessToken?: string | null
}) {
  const userId = store.get(userAtom)?.id

  if (!userId) return

  const noti: Noti = {
    id: uuidv4(),
    title,
    description,
    link,
    type,
    userReadFlag: owners.reduce((p, c) => ({ ...p, [c.id]: false }), {}),
    ownerIds: owners.map((o) => o.id),
    createdAt: serverTimestamp(),
  }

  await setData(FIREBASE_COLLTION_NAME.NOTIS, noti.id, noti)

  const notiTokens = owners.map((o) => o.notiToken).filter(Boolean)

  if (!accessToken || !notiTokens.length) return

  await axios.post(
    '/api/noti',
    {
      notiTitle: noti.title,
      notiBody: noti.description,
      notiUrl: noti.link,
      notiTokens: owners.map((o) => o.notiToken).filter(Boolean),
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  )
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

export async function getNotis({
  lastDocCreatedAt = null,
}: {
  lastDocCreatedAt: Noti['createdAt'] | null
}): Promise<PaginatedResponse<Noti>> {
  const userId = store.get(userAtom)?.id

  if (!userId) return { data: [], count: 0 }

  const query: QueryConstraint[] = [where('ownerIds', 'array-contains', userId), orderBy('createdAt', 'desc')]

  const count = await getTotalCount(FIREBASE_COLLTION_NAME.NOTIS, query)
  if (!count) return { data: [], count: 0 }

  if (lastDocCreatedAt) query.push(startAfter(lastDocCreatedAt))

  query.push(limit(countPerPage))

  const notis: Noti[] | null = await getQueryData(FIREBASE_COLLTION_NAME.NOTIS, query)

  return { data: notis || [], count }
}
