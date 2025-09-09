import { Card, CardContent } from '@/components/ui/card'
import { LuCheck, LuPlus } from 'react-icons/lu'
import { MemberFormType } from '../_hooks/useGroupForm'
import { isDesktopAtom } from '@/repositories/layout'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { CommandLoading } from 'cmdk'
import { LuLoaderCircle } from 'react-icons/lu'
import { useMemberPicker } from '../_hooks/useMemberPicker'
import { useDebounce } from 'use-debounce'
import { UserAvatar } from '@/components/UserAvatar'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

export function MemberPicker({
  selectedMembers,
  onAddMember,
}: {
  selectedMembers: string[]
  onAddMember: (member: MemberFormType) => void
}) {
  const isDesktop = useAtomValue(isDesktopAtom)

  const { friendQuery, setSearchFriend } = useMemberPicker()

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 1000)
  const [isDebouncing, setIsDebouncing] = useState(false)

  useEffect(() => {
    setSearchFriend(debouncedSearch)
    setIsDebouncing(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  const picker = (
    <Card className="cursor-pointer overflow-hidden border-2 border-dashed">
      <CardContent className="flex w-full items-center justify-center p-4">
        <div className="grid size-11 place-items-center rounded-full border-2 border-dashed">
          <LuPlus />
        </div>
      </CardContent>
    </Card>
  )

  const foundFriendList = (
    <Command shouldFilter={false}>
      <CommandInput
        placeholder="Search friends..."
        value={search}
        onValueChange={(v) => {
          setSearch(v)
          setIsDebouncing(true)
        }}
      />
      <CommandList>
        <ScrollArea className="h-[300px]">
          {!friendQuery.isFetching && !isDebouncing && <CommandEmpty>Find someone</CommandEmpty>}
          {(friendQuery.isFetching || isDebouncing) && (
            <CommandLoading className="flex justify-center pt-2">
              <LuLoaderCircle className="size-8 animate-spin" />
            </CommandLoading>
          )}
          <CommandGroup>
            {(friendQuery.data?.data || [])?.map((friend) => (
              <CommandItem
                className="gap-4 font-bold"
                value={friend.userId}
                disabled={selectedMembers.includes(friend.userId)}
                key={friend.userId}
                onSelect={() => {
                  setOpen(false)
                  setSearch('')
                  onAddMember({
                    id: friend.userId,
                    name: friend.name,
                    imageUrl: friend.imageUrl,
                    profileBgColor: friend.profileBgColor,
                    email: friend.email,
                    oneSignalId: friend.oneSignalId || '',
                    referalCode: friend.referalCode,
                  })
                }}
              >
                <UserAvatar
                  imageUrl={friend.imageUrl || ''}
                  fallbackText={friend.name}
                  profileBgColor={friend.profileBgColor}
                  className=""
                />
                {friend.name}
                <LuCheck
                  className={cn('ml-auto', selectedMembers.includes(friend.userId) ? 'opacity-100' : 'opacity-0')}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </Command>
  )

  if (isDesktop)
    return (
      <Popover open={open} onOpenChange={setOpen} modal>
        {selectedMembers.length < 10 && <PopoverTrigger asChild>{picker}</PopoverTrigger>}
        <PopoverContent className="p-0" align="start" side="bottom">
          {foundFriendList}
        </PopoverContent>
      </Popover>
    )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {selectedMembers.length < 10 && <DrawerTrigger asChild>{picker}</DrawerTrigger>}
      <DrawerContent>
        <div className="mt-4 border-t">{foundFriendList}</div>
      </DrawerContent>
    </Drawer>
  )
}
