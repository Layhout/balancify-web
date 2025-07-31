'use client'

import { useFriend } from './_hooks/useFriend'
import { FriendsWrapper } from './_components/FriendsWrapper'
import { FriendCard } from './_components/FriendCard'
import { PageHeader } from '@/components/PageHeader'
import { AddFriendDialog } from './_components/AddFriendDialog'
import { useAtomValue } from 'jotai'
import { isDesktopAtom } from '@/repositories/layout'
import { Empty } from '@/components/Empty'
import { FriendResponse } from '@/types/common'
import { InviteFriendDialog } from './_components/InviteFriendDialog'
import { Button } from '@/components/ui/button'
import { LuPlus } from 'react-icons/lu'

export default function Friends() {
  const {
    friendQuery,
    friendData,
    addFriendForm,
    openAddFriendDialog,
    isAddingFriend,
    openInvitionDialog,
    acceptFriendMutation,
    rejectFriendMutation,
    setOpenAddFriendDialog,
    onSubmitFriendForm,
    setOpenInvitionDialog,
    setSearch,
  } = useFriend()

  const isDesktop = useAtomValue(isDesktopAtom)
  console.log('data', friendQuery.data)

  return (
    <div className="container pb-4">
      <PageHeader
        title="Friends"
        hasBackBtn={!isDesktop}
        hasSearch
        onSearch={setSearch}
        action={
          <Button className="gap-2" onClick={() => setOpenAddFriendDialog(true)}>
            <LuPlus className="h-4 w-4" /> Add a Friend
          </Button>
        }
      />
      {friendQuery.isFetching || friendData.length ? (
        <>
          <FriendsWrapper loading={friendQuery.isFetching}>
            {friendData.map((friend, i) => (
              <FriendCard
                key={i}
                {...(friend as FriendResponse)}
                onAcceptRequest={(id) => acceptFriendMutation.mutate({ friendId: id })}
                onRejectRequest={(id) => rejectFriendMutation.mutate({ friendId: id })}
              />
            ))}
          </FriendsWrapper>
          {friendQuery.hasNextPage && (
            <div className="mt-4 flex justify-center">
              <Button onClick={() => friendQuery.fetchNextPage()} variant="secondary">
                Load More
              </Button>
            </div>
          )}
        </>
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
