import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'
import Link from 'next/link'
import { HiUser } from 'react-icons/hi2'
import { IoSettings } from 'react-icons/io5'
import { LuChevronRight, LuSquarePen } from 'react-icons/lu'

export function ActionList() {
  return (
    <div className="mt-8 flex flex-col gap-4">
      <Button className="w-full justify-between px-4" variant="secondary" size="lg" asChild>
        <Link href={ROUTES.APP.FRIENDS}>
          <div className="flex items-center gap-4">
            <HiUser className="size-4" />
            <h1>Friends</h1>
          </div>
          <LuChevronRight className="size-4" />
        </Link>
      </Button>
      <Button className="w-full justify-between px-4" variant="secondary" size="lg" asChild>
        <Link href={ROUTES.APP.SETTINGS}>
          <div className="flex items-center gap-4">
            <IoSettings className="size-4" />
            <h1>Settings</h1>
          </div>
          <LuChevronRight className="size-4" />
        </Link>
      </Button>
      <Button className="w-full justify-between px-4" variant="secondary" size="lg" asChild>
        <Link href={ROUTES.LANDING.BLOGS}>
          <div className="flex items-center gap-4">
            <LuSquarePen className="size-4" />
            <h1>Dev Blog</h1>
          </div>
          <LuChevronRight className="size-4" />
        </Link>
      </Button>
    </div>
  )
}
