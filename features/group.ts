import { PaginatedResponse, User } from '@/types/common'
import { store } from '@/repositories'
import { userAtom } from '@/repositories/user'
import { documentId, limit, orderBy, QueryConstraint, serverTimestamp, startAfter, where } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { generateTrigrams } from '@/lib/utils'
import { countPerPage, FIREBASE_COLLTION_NAME } from '@/lib/constants'
import { firestore } from '@/lib/firestore'
import { Group, GroupUserJunction } from '@/types/common'

const createGroup = async ({ name, description, members }: { name: string; description?: string; members: User[] }) => {
  const user = store.get(userAtom)

  if (!user) return

  members = [...members, user]

  const group: Group = {
    id: uuidv4(),
    name,
    description,
    nameTrigrams: generateTrigrams(name),
    createdAt: serverTimestamp(),
    createdBy: user.id,
    members,
    totalExpenses: 0,
  }

  const groupUserJunction: GroupUserJunction = {
    groupId: group.id,
    userFlag: members.reduce(
      (acc, member) => {
        acc[member.id] = true
        return acc
      },
      {} as Record<string, true>,
    ),
  }

  await firestore.setData(FIREBASE_COLLTION_NAME.GROUPS, group.id, group)
  await firestore.setData(FIREBASE_COLLTION_NAME.GROUP_USERS_JUNCTIONS, groupUserJunction.groupId, groupUserJunction)
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

  const groupUserJunctions: GroupUserJunction[] = await firestore.getQueryData(
    FIREBASE_COLLTION_NAME.GROUP_USERS_JUNCTIONS,
    [where(`userFlag.${userId}`, '==', true)],
  )

  if (!groupUserJunctions.length) return { data: [], count: 0 }

  const collectionPath = FIREBASE_COLLTION_NAME.GROUPS

  const query: QueryConstraint[] = [
    where(
      documentId(),
      'in',
      groupUserJunctions.map((g) => g.groupId),
    ),
    orderBy('createdAt', 'desc'),
  ]

  if (search) query.unshift(where('nameTrigrams', 'array-contains-any', generateTrigrams(search)))

  const count = await firestore.getTotalCount(collectionPath, query)
  if (!count) return { data: [], count: 0 }

  if (lastDocCreatedAt) query.push(startAfter(lastDocCreatedAt))

  query.push(limit(countPerPage))

  const groups: Group[] | null = await firestore.getQueryData(collectionPath, query)

  return { data: groups || [], count }
}

const getGroupDetail = async (id: string): Promise<Group | null> => {
  const userId = store.get(userAtom)?.id

  if (!userId) return null

  const collectionPath = FIREBASE_COLLTION_NAME.GROUPS

  const group: Group | null = await firestore.getData(collectionPath, id)

  if (!group) return null

  return {
    ...group,
    expenses: [],
  }
}

const group = { createGroup, getGroups, getGroupDetail }

export { group }
