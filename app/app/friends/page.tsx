'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LuPlus } from 'react-icons/lu'
import { useFriend } from './_hooks/useFriend'
import FriendsWrapper from './_components/FriendsWrapper'
import FriendCard from './_components/FriendCard'

export default function Friends() {
  const { isPending, friendData } = useFriend()

  return (
    <div className="container pb-4">
      <div className="mt-8 flex items-center justify-between md:mt-0">
        <h1 className="text-3xl font-bold">Friends</h1>
        <Button className="gap-2 md:hidden">
          <LuPlus className="h-4 w-4" /> Add Friend
        </Button>
      </div>
      <div className="my-6 flex items-center justify-between gap-4">
        <Input className="md:max-w-sm" placeholder="Search..." type="search" />
        <Button className="hidden gap-2 md:flex">
          <LuPlus className="h-4 w-4" /> Add Friend
        </Button>
      </div>
      <FriendsWrapper loading={isPending}>
        {friendData.map((friend, i) => (
          <FriendCard key={i} {...friend} />
        ))}
      </FriendsWrapper>
    </div>
  )
}
