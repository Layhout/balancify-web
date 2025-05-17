'use client'

import { Button } from '@/components/ui/button'
import { LuPlus } from 'react-icons/lu'
import { useFriend } from './_hooks/useFriend'
import { FriendsWrapper } from './_components/FriendsWrapper'
import { FriendCard } from './_components/FriendCard'
import { PageHeader } from '@/components/PageHeader'

export default function Friends() {
  const { isPending, friendData } = useFriend()

  return (
    <div className="container pb-4">
      <PageHeader
        title="Friends"
        hasSearch
        action={
          <Button className="gap-2">
            <LuPlus className="h-4 w-4" /> Add Friend
          </Button>
        }
      />
      <FriendsWrapper loading={isPending}>
        {friendData.map((friend, i) => (
          <FriendCard key={i} {...friend} />
        ))}
      </FriendsWrapper>
    </div>
  )
}
