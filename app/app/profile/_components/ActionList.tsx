import { PWAInstallPrompt } from '@/components/PWAInstallPrompt'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'
import { auth } from '@/lib/firebase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSignOut } from 'react-firebase-hooks/auth'
import { FaUserFriends } from 'react-icons/fa'
import { IoSettings } from 'react-icons/io5'
import { LuChevronRight, LuLogOut, LuSquarePen } from 'react-icons/lu'
import { MdInstallMobile } from 'react-icons/md'

export function ActionList() {
  const router = useRouter()
  const [signOut] = useSignOut(auth)

  return (
    <div className="mt-8 flex flex-col gap-4">
      <Button className="w-full justify-between px-4" variant="secondary" size="lg" asChild>
        <Link href={ROUTES.APP.FRIENDS}>
          <div className="flex items-center gap-4">
            <FaUserFriends className="size-4" />
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
      <PWAInstallPrompt
        triggerBtn={
          <Button className="w-full items-center justify-start gap-4 px-4" variant="secondary" size="lg">
            <MdInstallMobile />
            Install App
          </Button>
        }
      />
      <Button
        className="w-full justify-between px-4"
        variant="destructive"
        size="lg"
        onClick={async () => {
          const res = await signOut()

          if (res) {
            router.replace(ROUTES.LANDING.HOME)
          }
        }}
      >
        <div className="flex items-center gap-4">
          <LuLogOut className="size-4" />
          <h1>Sign Out</h1>
        </div>
      </Button>
    </div>
  )
}
