import { PaginatedResponse, User } from '@/types/common'
import { store } from '@/repositories'
import { userAtom } from '@/repositories/user'
import { documentId, limit, orderBy, QueryConstraint, serverTimestamp, startAfter, where } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { generateTrigrams } from '@/lib/utils'
import { countPerPage, FIREBASE_COLLTION_NAME } from '@/lib/constants'
import { firestore } from '@/lib/firestore'
import { Group } from '@/types/common'

const createGroup = async ({ name, description, members }: { name: string; description?: string; members: User[] }) => {
  const user = store.get(userAtom)

  if (!user) return

  const group: Group = {
    id: uuidv4(),
    name,
    description,
    nameTrigrams: generateTrigrams(name),
    createdAt: serverTimestamp(),
    createdBy: user.id,
    members: members,
    totalExpenses: 0,
  }

  await firestore.setData(`${FIREBASE_COLLTION_NAME.GROUPS}/${user.id}/data`, group.id, group)
}

const getGroups = async ({
  lastDocCreatedAt = null,
  search,
}: {
  lastDocCreatedAt: Group['createdAt'] | null
  search: string
}): Promise<PaginatedResponse<Group>> => {
  const userId = store.get(userAtom)?.id

  if (!userId) return { data: [], count: 0 }

  const collectionPath = `${FIREBASE_COLLTION_NAME.GROUPS}/${userId}/data`

  const query: QueryConstraint[] = [orderBy('createdAt', 'desc')]

  if (lastDocCreatedAt) query.push(startAfter(lastDocCreatedAt), limit(countPerPage))
  else query.push(limit(countPerPage))

  if (search) query.unshift(where('nameTrigrams', 'array-contains-any', generateTrigrams(search)))

  const count = await firestore.getTotalCount(collectionPath, query)
  if (!count) return { data: [], count: 0 }

  const groups: Group[] | null = await firestore.getQueryData(collectionPath, query)

  return { data: groups || [], count }
}

const getGroupDetail = async (id: string): Promise<Group | null> => {
  const userId = store.get(userAtom)?.id

  if (!userId) return null

  const collectionPath = `${FIREBASE_COLLTION_NAME.GROUPS}/${userId}/data`

  const group: Group | null = await firestore.getData(collectionPath, id)

  if (!group) return null

  const users: User[] | null = await firestore.getQueryData(FIREBASE_COLLTION_NAME.USERS, [
    where(
      documentId(),
      'in',
      (group?.members || []).map((m) => m.id),
    ),
  ])

  return {
    ...group,
    members: users || [],
    expenses: [],
  }
}

const group = { createGroup, getGroups, getGroupDetail }

export { group }
