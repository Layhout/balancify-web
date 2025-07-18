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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

export default function Friends() {
  const {
    friendQuery,
    addFriendForm,
    openAddFriendDialog,
    isAddingFriend,
    openInvitionDialog,
    acceptFriendMutation,
    rejectFriendMutation,
    page,
    totalPage,
    setOpenAddFriendDialog,
    onSubmitFriendForm,
    setOpenInvitionDialog,
    goNextPage,
    goPrevPage,
    setSearch,
  } = useFriend()

  const isDesktop = useAtomValue(isDesktopAtom)

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
      {friendQuery.isFetching || friendQuery.data?.count ? (
        <>
          <FriendsWrapper loading={friendQuery.isFetching}>
            {friendQuery.data?.data.map((friend, i) => (
              <FriendCard
                key={i}
                {...(friend as FriendResponse)}
                onAcceptRequest={(id) => acceptFriendMutation.mutate({ friendId: id })}
                onRejectRequest={(id) => rejectFriendMutation.mutate({ friendId: id })}
              />
            ))}
          </FriendsWrapper>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={cn('cursor-pointer', { 'cursor-not-allowed': page === 0, 'opacity-50': page === 0 })}
                  onClick={goPrevPage}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className={cn('cursor-pointer', {
                    'cursor-not-allowed': page === totalPage - 1,
                    'opacity-50': page === totalPage - 1,
                  })}
                  onClick={goNextPage}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
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
