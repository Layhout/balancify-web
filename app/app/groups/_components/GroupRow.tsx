import { AvatarStack } from '@/components/AvatarStack'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ROUTES } from '@/lib/constants'
import { Group } from '@/services/group.model'
import Link from 'next/link'
import { LuChevronRight } from 'react-icons/lu'

export function GroupRow({ name, members, createdAt, totalSpent, id }: Group) {
  return (
    <li>
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex-[0.6] overflow-hidden lg:flex-[0.3]">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">{name}</p>
            <p className="block text-xs lg:hidden">
              {members.length} members • {createdAt}
            </p>
          </div>
          <div className="hidden flex-[0.3] lg:block">
            <AvatarStack
              items={members.map((m) => ({
                imageSrc: m.imageUrl,
                initial: m.firstName[0] + m.lastName[0],
                bgColor: m.profileBgColor,
              }))}
            />
          </div>
          <p className="hidden flex-[0.2] lg:block">{createdAt}</p>
          <div className="flex flex-[0.4] items-center justify-between lg:flex-[0.2]">
            <p>{totalSpent}</p>
            <Button variant="ghost" size="icon" asChild>
              <Link href={`${ROUTES.APP.GROUPS}/${id}`}>
                <LuChevronRight className="size-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </li>
  )
}
