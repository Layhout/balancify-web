import { GroupMetadata, NotiType, PaginatedResponse, User } from '@/types/common'
import { store } from '@/repositories'
import { userAtom } from '@/repositories/user'
import {
  arrayRemove,
  deleteField,
  documentId,
  limit,
  orderBy,
  QueryConstraint,
  serverTimestamp,
  startAfter,
  where,
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { generateTrigrams } from '@/lib/utils'
import { countPerPage, FIREBASE_COLLTION_NAME } from '@/lib/constants'
import { Group } from '@/types/common'
import { createNoti } from './noti'
import { ROUTES } from '@/lib/constants'
import { deleteData, getQueryData, getTotalCount, setMultipleData, updateMultipleData } from '@/lib/firestore'

export async function createGroup({
  name,
  description,
  members,
  apiToken,
}: {
  name: string
  description?: string
  members: User[]
  apiToken?: string | null
}) {
  const user = store.get(userAtom)

  if (!user) return

  members = [...members, user]

  const membersFlag = members.reduce((p, c) => ({ ...p, [c.id]: true }), {})

  const group: Group = {
    id: uuidv4(),
    name,
    description,
    createdAt: serverTimestamp(),
    createdBy: user.id,
    members,
    membersFlag,
  }

  const groupMetadata: GroupMetadata = {
    groupId: group.id,
    nameTrigrams: generateTrigrams(group.name),
    membersFlag,
  }

  await setMultipleData([
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

  await createNoti({
    title: 'New Group',
    description: `${user.name} added you to a group.`,
    link: `${ROUTES.APP.GROUPS}/${group.id}`,
    type: NotiType.Group,
    owners: members,
    accessToken: apiToken,
  })
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
    groupMetadata = (await getQueryData(FIREBASE_COLLTION_NAME.GROUP_METADATA, [
      where('nameTrigrams', 'array-contains-any', generateTrigrams(search)),
      where(`membersFlag.${userId}`, '==', true),
    ])) as GroupMetadata[]
  }

  if (groupMetadata !== null && !groupMetadata.length) return { data: [], count: 0 }

  const collectionPath = FIREBASE_COLLTION_NAME.GROUPS

  const query: QueryConstraint[] = [orderBy('createdAt', 'desc')]

  if (groupMetadata) query.push(where(documentId(), 'in', groupMetadata?.map((g) => g.groupId) || []))
  else query.push(where(`membersFlag.${userId}`, '==', true))

  const count = await getTotalCount(collectionPath, query)
  if (!count) return { data: [], count: 0 }

  if (lastDocCreatedAt) query.push(startAfter(lastDocCreatedAt))

  query.push(limit(countPerPage))

  const groups: Group[] | null = await getQueryData(collectionPath, query)

  return { data: groups || [], count }
}

export async function getGroupDetail(id: string): Promise<Group | null> {
  if (!id) return null

  const userId = store.get(userAtom)?.id

  if (!userId) return null

  const collectionPath = FIREBASE_COLLTION_NAME.GROUPS

  const group: Group[] | null = await getQueryData(collectionPath, [
    where(documentId(), '==', id),
    where('memberIds', 'array-contains', userId),
  ])

  if (!group?.length) return null

  return {
    ...group[0],
  }
}

export async function editGroup({
  id,
  name,
  description,
  members,
}: {
  id: string
  name: string
  description?: string
  members: User[]
}) {
  const userId = store.get(userAtom)?.id

  if (!userId) return

  await updateMultipleData([
    {
      collectionName: FIREBASE_COLLTION_NAME.GROUPS,
      id,
      data: <Partial<Group>>{
        name,
        description,
        members,
        memberIds: members.map((m) => m.id),
      },
    },
    {
      collectionName: FIREBASE_COLLTION_NAME.GROUP_METADATA,
      id,
      data: <Partial<GroupMetadata>>{
        nameTrigrams: generateTrigrams(name),
        membersFlag: members.reduce((p, c) => ({ ...p, [c.id]: true }), {}),
      },
    },
  ])
}

export async function leaveGroup({ id }: { id: string }) {
  const user = store.get(userAtom)

  if (!user) return

  await updateMultipleData([
    {
      collectionName: FIREBASE_COLLTION_NAME.GROUPS,
      id,
      data: {
        members: arrayRemove(user),
        memberIds: arrayRemove(user.id),
      },
    },
    {
      collectionName: FIREBASE_COLLTION_NAME.GROUP_METADATA,
      id,
      data: {
        [`membersFlag.${user.id}`]: deleteField(),
      },
    },
  ])
}

export async function deleteGroup({ id }: { id: string }) {
  const userId = store.get(userAtom)?.id

  if (!userId) return

  await Promise.all([
    deleteData(FIREBASE_COLLTION_NAME.GROUPS, id),
    deleteData(FIREBASE_COLLTION_NAME.GROUP_METADATA, id),
  ])
}
