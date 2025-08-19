import { GroupMetadata, PaginatedResponse, User } from '@/types/common'
import { store } from '@/repositories'
import { userAtom } from '@/repositories/user'
import { documentId, limit, orderBy, QueryConstraint, serverTimestamp, startAfter, where } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { generateTrigrams } from '@/lib/utils'
import { countPerPage, FIREBASE_COLLTION_NAME } from '@/lib/constants'
import { firestore } from '@/lib/firestore'
import { Group } from '@/types/common'

export async function createGroup({
  name,
  description,
  members,
}: {
  name: string
  description?: string
  members: User[]
}) {
  const user = store.get(userAtom)

  if (!user) return

  members = [...members, user]

  const group: Group = {
    id: uuidv4(),
    name,
    description,
    createdAt: serverTimestamp(),
    createdBy: user.id,
    members,
    memberIds: members.map((m) => m.id),
    totalExpenses: 0,
  }

  const groupMetadata: GroupMetadata = {
    groupId: group.id,
    nameTrigrams: generateTrigrams(group.name),
    membersFlag: members.reduce((acc, m) => ({ ...acc, [m.id]: true }), {}),
  }

  await firestore.setMultipleData([
    {
      collectionName: FIREBASE_COLLTION_NAME.GROUPS,
      id: group.id,
      data: group,
    },
    {
      collectionName: FIREBASE_COLLTION_NAME.GROUP_METADATA,
      id: group.id,
      data: groupMetadata,
    },
  ])
}

export async function getGroups({
  lastDocCreatedAt = null,
  search,
}: {
  lastDocCreatedAt: Group['createdAt'] | null
  search: string
}): Promise<PaginatedResponse<Group>> {
  const userId = store.get(userAtom)?.id

  if (!userId) return { data: [], count: 0 }

  let groupMetadata: GroupMetadata[] | null = null

  if (search) {
    groupMetadata = (await firestore.getQueryData(FIREBASE_COLLTION_NAME.GROUP_METADATA, [
      where('nameTrigrams', 'array-contains-any', generateTrigrams(search)),
      where(`membersFlag.${userId}`, '==', true),
    ])) as GroupMetadata[]
  }

  if (groupMetadata !== null && !groupMetadata.length) return { data: [], count: 0 }

  const collectionPath = FIREBASE_COLLTION_NAME.GROUPS

  const query: QueryConstraint[] = [where('memberIds', 'array-contains', userId), orderBy('createdAt', 'desc')]

  if (groupMetadata) query.push(where(documentId(), 'in', groupMetadata?.map((g) => g.groupId) || []))

  const count = await firestore.getTotalCount(collectionPath, query)
  if (!count) return { data: [], count: 0 }

  if (lastDocCreatedAt) query.push(startAfter(lastDocCreatedAt))

  query.push(limit(countPerPage))

  const groups: Group[] | null = await firestore.getQueryData(collectionPath, query)

  return { data: groups || [], count }
}

export async function getGroupDetail(id: string): Promise<Group | null> {
  const userId = store.get(userAtom)?.id

  if (!userId) return null

  const collectionPath = FIREBASE_COLLTION_NAME.GROUPS

  const group: Group[] | null = await firestore.getQueryData(collectionPath, [
    where(documentId(), '==', id),
    where('memberIds', 'array-contains', userId),
  ])

  if (!group?.length) return null

  return {
    ...group[0],
    expenses: [],
  }
}
