'use client'

import { PageHeader } from '@/components/PageHeader'
import { useProfile } from './_hooks/useProfile'
import { ProfileAvatar } from './_components/ProfileAvatar'
import { ActionList } from './_components/ActionList'
import { APP_V } from '@/lib/version'

export default function Profile() {
  const { user } = useProfile()

  return (
    <div className="container flex h-[85vh] flex-col justify-between pb-4">
      <div>
        <PageHeader title="Profile" />
        <ProfileAvatar user={user} />
        <ActionList />
      </div>
      <h1 className="text-center text-xs text-muted-foreground">v{APP_V}</h1>
    </div>
  )
}
