import { ScrollArea } from '@/components/ui/scroll-area'
import { FriendCardPlaceholder } from './FriendCardPlaceholder'

export function FriendsWrapper({
  children,
  loading,
}: Readonly<{
  children?: React.ReactNode
  loading: boolean
}>) {
  return (
    <ScrollArea className="h-[75vh]">
      <div className="grid grid-cols-1 gap-4 overflow-auto md:grid-cols-2 lg:grid-cols-3">
        {loading ? Array.from({ length: 3 }, (_, i) => <FriendCardPlaceholder key={i} />) : children}
      </div>
    </ScrollArea>
  )
}
