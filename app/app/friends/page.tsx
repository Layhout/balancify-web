'use client'

import { useFriend } from './_hooks/useFriend'
import { FriendsWrapper } from './_components/FriendsWrapper'
import { FriendCard } from './_components/FriendCard'
import { PageHeader } from '@/components/PageHeader'
import { InviteFriendDialog } from './_components/InviteFriendDialog'
import { useAtomValue } from 'jotai'
import { isDesktopAtom } from '@/repositories/layout'

export default function Friends() {
  const { isPending, friendData } = useFriend()
  const isDesktop = useAtomValue(isDesktopAtom)

  return (
    <div className="container pb-4">
      <PageHeader title="Friends" hasSearch action={<InviteFriendDialog />} hasBackBtn={!isDesktop} />
      <FriendsWrapper loading={isPending}>
        {friendData.map((friend, i) => (
          <FriendCard key={i} {...friend} />
        ))}
      </FriendsWrapper>
    </div>
  )
}
