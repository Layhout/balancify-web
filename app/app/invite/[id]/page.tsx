'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'

type InviteProps = {
  params: {
    id: string
  }
}

export default function Invite({ params: { id } }: InviteProps) {
  const { isLoaded, user } = useUser()

  useEffect(() => {
    if (!isLoaded) return
  }, [isLoaded, user])

  return <div>{id}</div>
}
