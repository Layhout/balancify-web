'use client'

import { PageHeader } from '@/components/PageHeader'
import { useProfile } from './_hooks/useProfile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { HiUser } from 'react-icons/hi2'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants'
import { LuChevronRight } from 'react-icons/lu'
import { IoSettings } from 'react-icons/io5'

export default function Profile() {
  const { user } = useProfile()

  return (
    <div className="container pb-4">
      <PageHeader title="Profile" />
      <div className="flex flex-col items-center">
        <Avatar className="size-28">
          <AvatarImage className="size-full" src={user?.imageUrl} alt="User" />
          <AvatarFallback className="size-full text-2xl">
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
        <h1 className="mt-4 font-bold">{user?.fullName}</h1>
        <h1 className="mt-1 text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</h1>
      </div>
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
      </div>
    </div>
  )
}
