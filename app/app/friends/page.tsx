'use client'

import { useFriend } from './_hooks/useFriend'
import { FriendsWrapper } from './_components/FriendsWrapper'
import { FriendCard } from './_components/FriendCard'
import { PageHeader } from '@/components/PageHeader'
import { AddFriendDialog } from './_components/AddFriendDialog'
import { useAtomValue } from 'jotai'
import { isDesktopAtom } from '@/repositories/layout'
import { Empty } from '@/components/Empty'
import { User } from '@/types/common'
import { InviteFriendDialog } from './_components/InviteFriendDialog'
import { Button } from '@/components/ui/button'
import { LuPlus } from 'react-icons/lu'

export default function Friends() {
  const {
    friendQuery,
    addFriendForm,
    openAddFriendDialog,
    setOpenAddFriendDialog,
    onSubmitFriendForm,
    isAddingFriend,
    openInvitionDialog,
    setOpenInvitionDialog,
  } = useFriend()

  const isDesktop = useAtomValue(isDesktopAtom)

  return (
    <div className="container pb-4">
      <PageHeader
        title="Friends"
        hasSearch
        hasBackBtn={!isDesktop}
        action={
          <Button className="gap-2" onClick={() => setOpenAddFriendDialog(true)}>
            <LuPlus className="h-4 w-4" /> Add a Friend
          </Button>
        }
      />
      {friendQuery.data?.length ? (
        <FriendsWrapper loading={friendQuery.isFetching}>
          {friendQuery.data.map((friend, i) => (
            <FriendCard key={i} {...(friend as User)} />
          ))}
        </FriendsWrapper>
      ) : (
        <Empty />
      )}
      <AddFriendDialog
        open={openAddFriendDialog}
        setOpen={setOpenAddFriendDialog}
        form={addFriendForm}
        onSubmit={onSubmitFriendForm}
        isAddingFriend={isAddingFriend}
      />
      <InviteFriendDialog open={openInvitionDialog} setOpen={setOpenInvitionDialog} />
    </div>
  )
}
