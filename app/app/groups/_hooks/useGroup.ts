'use client'

import { QUERY_KEYS } from '@/lib/constants'
import { Group, PaginatedResponse } from '@/types/common'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { userAtom } from '@/repositories/user'
import { useAtomValue } from 'jotai'
import { getGroups } from '@/features/group'

export function useGroup() {
  const localUser = useAtomValue(userAtom)

  const [search, setSearch] = useState('')

  const queryKey = [QUERY_KEYS.GROUPS, 'list', localUser?.id, search]

  const groupQuery = useInfiniteQuery({
    queryKey,
    getNextPageParam: (lastPage: PaginatedResponse<Group>, allPages: PaginatedResponse<Group>[]) => {
      const count = lastPage.count
      const totalCount = allPages.flatMap((page) => page.data).length

      if (totalCount >= count) {
        return null
      }

      return lastPage.data.slice().pop()?.createdAt || null
    },
    initialPageParam: null,
    queryFn: ({ pageParam }) => getGroups({ lastDocCreatedAt: pageParam, search }),
  })

  const groupData: Group[] = groupQuery.data?.pages.flatMap((page) => page.data) || []

  return { groupQuery, groupData, setSearch }
}
