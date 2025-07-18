import { LOCALSTORAGE_KEYS } from '@/lib/constants'
import { User } from '@/types/common'
import { atomWithStorage } from 'jotai/utils'

export const userAtom = atomWithStorage<User | undefined>(LOCALSTORAGE_KEYS.USER, undefined)
