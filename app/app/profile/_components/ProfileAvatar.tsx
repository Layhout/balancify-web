import { Skeleton } from '@/components/ui/skeleton'
import { UserAvatar } from '@/components/UserAvatar'
import { auth } from '@/lib/firebase'
import { getInitials } from '@/lib/utils'
import { useAuthState } from 'react-firebase-hooks/auth'

type ProfileAvatarProps = {}

export function ProfileAvatar({}: ProfileAvatarProps) {
  const [user] = useAuthState(auth)

  return (
    <div className="flex flex-col items-center">
      <UserAvatar
        imageUrl={user?.photoURL || ''}
        fallbackText={getInitials(user?.displayName || '')}
        className="size-28"
        fallbackTextclassName="text-2xl"
      />
      {user?.displayName ? (
        <h1 className="mt-4 font-bold">{user.displayName}</h1>
      ) : (
        <Skeleton className="mt-5 h-4 w-36" />
      )}
      {user?.email ? (
        <h1 className="mt-1 text-sm text-muted-foreground">{user?.email}</h1>
      ) : (
        <Skeleton className="mt-3 h-3.5 w-48" />
      )}
    </div>
  )
}
