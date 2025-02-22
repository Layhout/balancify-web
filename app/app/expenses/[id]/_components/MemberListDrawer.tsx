import { Button } from '@/components/ui/button'
import MemberListItem from './MemberListItem'
import { MemberListProps } from './MemberList'
import MemberListItemPlaceholder from './MemberListItemPlaceholder'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export default function MemberListDrawer({ loading, members }: MemberListProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) return null

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          Members
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Members</DrawerTitle>
        </DrawerHeader>
        <div className="max-h-[80vh] overflow-auto p-4 pt-0">
          {loading ? (
            <MemberListItemPlaceholder />
          ) : (
            <ul className="mt-6 flex flex-col gap-4">
              {members?.map((member, i) => <MemberListItem key={i} {...member} />)}
            </ul>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
