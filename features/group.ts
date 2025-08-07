import { GroupMember } from '@/types/common'
import { store } from '@/repositories'
import { userAtom } from '@/repositories/user'
import { serverTimestamp } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { generateTrigrams } from '@/lib/utils'
import { FIREBASE_COLLTION_NAME } from '@/lib/constants'
import { firestore } from '@/lib/firestore'
import { Group } from '@/types/common'

const createGroup = async ({
  name,
  description,
  members,
}: {
  name: string
  description?: string
  members: GroupMember[]
}) => {
  const user = store.get(userAtom)

  if (!user) return

  const group: Group = {
    id: uuidv4(),
    name,
    description,
    nameTrigrams: generateTrigrams(name),
    createdAt: serverTimestamp(),
    members: members,
    totalExpenses: 0,
    expenses: [],
  }

  firestore.setData(`${FIREBASE_COLLTION_NAME.GROUPS}/${user.id}/data`, group.id, group)
}

const group = { createGroup }

export { group }
