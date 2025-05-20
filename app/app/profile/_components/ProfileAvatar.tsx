import { Skeleton } from '@/components/ui/skeleton'
import { UserAvatar } from '@/components/UserAvatar'
import { UserResource } from '@clerk/types'

type ProfileAvatarProps = {
  user: UserResource | null | undefined
}

export function ProfileAvatar({ user }: ProfileAvatarProps) {
  return (
    <div className="flex flex-col items-center">
      <UserAvatar
        imageUrl={user?.imageUrl || ''}
        fallbackText={`${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`}
        className="size-28"
        fallbackTextclassName="text-2xl"
      />
      {user?.fullName ? <h1 className="mt-4 font-bold">{user.fullName}</h1> : <Skeleton className="mt-5 h-4 w-36" />}
      {user?.primaryEmailAddress?.emailAddress ? (
        <h1 className="mt-1 text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</h1>
      ) : (
        <Skeleton className="mt-3 h-3.5 w-48" />
      )}
    </div>
  )
}
