'use client'

import { useUser } from '@clerk/nextjs'

export function useProfile() {
  const { user } = useUser()

  return {
    user,
  }
}
