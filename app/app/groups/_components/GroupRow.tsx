import { AvatarStack } from '@/components/AvatarStack'
import { Card, CardContent } from '@/components/ui/card'
import { DEFAULT_DATE_FORMAT, ROUTES } from '@/lib/constants'
import { djs } from '@/lib/dayjsExt'
import { Group } from '@/types/common'
import { Timestamp } from 'firebase/firestore'
import Link from 'next/link'
import { LuChevronRight } from 'react-icons/lu'

export function GroupRow({ name, members, createdAt, id }: Group) {
  const createdAtString = djs((createdAt as Timestamp).toDate()).format(DEFAULT_DATE_FORMAT)
  console.log(members)

  return (
    <li>
      <Link href={`${ROUTES.APP.GROUPS}/${id}`}>
        <Card className="hover:bg-muted">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex-1 overflow-hidden lg:flex-[0.4]">
              <p className="overflow-hidden text-ellipsis whitespace-nowrap">{name}</p>
              <p className="block text-xs lg:hidden">
                {members.length} members • {createdAtString}
              </p>
            </div>
            <div className="hidden flex-[0.4] lg:block">
              <AvatarStack
                items={members.map((m) => ({
                  imageSrc: m.imageUrl,
                  initial: m.name[0] + m.name[1],
                  bgColor: m.profileBgColor,
                }))}
              />
            </div>
            <div className="flex flex-none items-center justify-between lg:flex-[0.2]">
              <p className="hidden lg:block">{createdAtString}</p>
              <LuChevronRight className="size-4" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </li>
  )
}
