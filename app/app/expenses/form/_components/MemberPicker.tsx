import { isDesktopAtom } from '@/repositories/layout'
import { FriendResponse, Group, User } from '@/types/common'
import { useAtomValue } from 'jotai'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Card, CardContent } from '@/components/ui/card'
import { AiOutlineUserAdd, AiOutlineUsergroupAdd } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useGroupsFriendsPicker } from '../hooks/useGroupsFriendsPicker'
import { CommandLoading } from 'cmdk'
import { LuCheck, LuLoaderCircle } from 'react-icons/lu'
import { UserAvatar } from '@/components/UserAvatar'
import { cn } from '@/lib/utils'

type MemberPickerProps = {
  mode: 'group' | 'friend'
  selectedIds: string[]
  onAddMember: (member: User[]) => void
  onSelectGroup: (group?: { id: string; name: string }) => void
}

export function MemberPicker({ mode, selectedIds, onAddMember, onSelectGroup }: MemberPickerProps) {
  const isDesktop = useAtomValue(isDesktopAtom)

  const { foundQuery, setSearchValue } = useGroupsFriendsPicker({ mode })

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 1000)
  const [isDebouncing, setIsDebouncing] = useState(false)

  useEffect(() => {
    setSearchValue(debouncedSearch)
    setIsDebouncing(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  const picker = (
    <Card className="cursor-pointer overflow-hidden border-2 border-dashed">
      <CardContent className="flex h-full w-full items-center justify-center p-4">
        <div className="grid size-11 place-items-center rounded-full border-2 border-dashed">
          {mode === 'group' ? <AiOutlineUsergroupAdd /> : <AiOutlineUserAdd />}
        </div>
      </CardContent>
    </Card>
  )

  const foundList = (
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
          {!foundQuery.isFetching && !isDebouncing && <CommandEmpty>Type something</CommandEmpty>}
          {(foundQuery.isFetching || isDebouncing) && (
            <CommandLoading className="flex justify-center pt-2">
              <LuLoaderCircle className="size-8 animate-spin" />
            </CommandLoading>
          )}
          <CommandGroup>
            {mode === 'friend'
              ? ((foundQuery.data?.data || []) as FriendResponse[])?.map((friend) => {
                  return (
                    <CommandItem
                      className="gap-4 font-bold"
                      value={friend.userId}
                      disabled={selectedIds.includes(friend.userId)}
                      key={friend.userId}
                      onSelect={() => {
                        setOpen(false)
                        setSearch('')
                        onSelectGroup(undefined)
                        onAddMember([
                          {
                            id: friend.userId,
                            name: friend.name,
                            imageUrl: friend.imageUrl,
                            profileBgColor: friend.profileBgColor,
                            email: friend.email,
                            notiToken: friend.notiToken || '',
                            referalCode: friend.referalCode,
                          },
                        ])
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
                        className={cn('ml-auto', selectedIds.includes(friend.userId) ? 'opacity-100' : 'opacity-0')}
                      />
                    </CommandItem>
                  )
                })
              : ((foundQuery.data?.data || []) as Group[])?.map((group) => {
                  return (
                    <CommandItem
                      className="gap-4 font-bold"
                      value={group.id}
                      disabled={selectedIds.includes(group.id)}
                      key={group.id}
                      onSelect={() => {
                        setOpen(false)
                        setSearch('')
                        onAddMember(group.members)
                        onSelectGroup({ id: group.id, name: group.name })
                      }}
                    >
                      {group.name}
                      <LuCheck
                        className={cn('ml-auto', selectedIds.includes(group.id) ? 'opacity-100' : 'opacity-0')}
                      />
                    </CommandItem>
                  )
                })}
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </Command>
  )

  if (isDesktop)
    return (
      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>{picker}</PopoverTrigger>
        <PopoverContent className="p-0" align="start" side="bottom">
          {foundList}
        </PopoverContent>
      </Popover>
    )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{picker}</DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">{foundList}</div>
      </DrawerContent>
    </Drawer>
  )
}
