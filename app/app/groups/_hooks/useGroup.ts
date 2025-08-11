'use client'

import feature from '@/features'
import { QUERY_KEYS } from '@/lib/constants'
import { Group, PaginatedResponse } from '@/types/common'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useGroup() {
  const [search, setSearch] = useState('')

  const queryKey = [QUERY_KEYS.GROUPS, 'list', search]

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
    queryFn: ({ pageParam }) => feature.group.getGroups({ lastDocCreatedAt: pageParam, search }),
    placeholderData: keepPreviousData,
  })

  const groupData: Group[] = groupQuery.data?.pages.flatMap((page) => page.data) || []

  return { groupQuery, groupData, setSearch }
}
