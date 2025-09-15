import { Button } from '@/components/ui/button'
import { MemberListItem } from './MemberListItem'
import { MemberListProps } from './MemberList'
import { MemberListItemPlaceholder } from './MemberListItemPlaceholder'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { useAtomValue } from 'jotai'
import { isDesktopAtom } from '@/repositories/layout'
import { HiOutlineUsers } from 'react-icons/hi2'
import { ScrollArea } from '@/components/ui/scroll-area'

export function MemberListDrawer({ loading, members }: MemberListProps) {
  const isDesktop = useAtomValue(isDesktopAtom)

  if (isDesktop) return null

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <HiOutlineUsers />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Members</DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="h-[80vh] p-4 pt-0">
          {loading ? (
            <MemberListItemPlaceholder />
          ) : (
            <ul className="mt-6 flex flex-col gap-4">
              {members?.map((member, i) => (
                <MemberListItem key={i} {...member} />
              ))}
            </ul>
          )}
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
