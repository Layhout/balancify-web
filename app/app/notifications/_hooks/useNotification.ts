'use client'

import { QUERY_KEYS, QueryType } from '@/lib/constants'
import { Noti, PaginatedResponse } from '@/types/common'
import { useInfiniteQuery } from '@tanstack/react-query'
import { userAtom } from '@/repositories/user'
import { useAtomValue } from 'jotai'
import { getNotis } from '@/features/noti'

export function useNotification() {
  const localUser = useAtomValue(userAtom)

  const notiQuery = useInfiniteQuery({
    queryKey: [QUERY_KEYS.NOTI, QueryType.List, 'unread', localUser?.id],
    getNextPageParam: (lastPage: PaginatedResponse<Noti>, allPages: PaginatedResponse<Noti>[]) => {
      const count = lastPage.count
      const totalCount = allPages.flatMap((page) => page.data).length

      if (totalCount >= count) {
        return null
      }

      return lastPage.data.slice().pop()?.createdAt || null
    },
    initialPageParam: null,
    queryFn: ({ pageParam }) => getNotis({ lastDocCreatedAt: pageParam }),
  })

  const notiData: Noti[] = notiQuery.data?.pages.flatMap((page) => page.data) || []

  return { notiQuery, notiData }
}
