import { auth } from '@clerk/nextjs/server'
import { Button } from '@/components/ui/button'
import { NOTIFICATION_BAR_HEIGHT, ROUTES } from '@/lib/constants'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function Home() {
  const { userId } = auth()

  if (userId) {
    redirect(ROUTES.APP.DASHBOARD)
  }

  return (
    <main className="container flex h-screen flex-col justify-between">
      <div className={`${NOTIFICATION_BAR_HEIGHT} flex items-center justify-between`}>
        <h1 className="font-bold">Balancify</h1>
        <Button size="icon" asChild variant="ghost">
          <Link href="https://github.com/balancify-app/web" target="_blank">
            <GitHubLogoIcon className="size-4" />
          </Link>
        </Button>
      </div>
      <div className=" flex flex-1 flex-col items-center justify-center gap-10 md:flex-row md:justify-between md:gap-0">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold md:text-5xl">Simplify Group Spending.</h1>
          <p className="mt-6 text-sm sm:text-base">
            A clean, no-fuss way to manage shared expenses with anyone, anywhere. Because fairness shouldn’t be
            complicated.
          </p>
          <div className="flex items-center justify-center gap-4 md:justify-start">
            <Button size="lg" className="mt-10" asChild>
              <Link href={ROUTES.LANDING.SIGN_UP}>Try for free</Link>
            </Button>
            <Button size="lg" className="mt-10" asChild>
              <Link href={ROUTES.LANDING.SIGN_IN}>Sign In</Link>
            </Button>
          </div>
        </div>
        <div className="relative flex w-full max-w-[700px] items-center justify-start">
          <div className="max-size-[300px] absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/20 blur-3xl" />
          <img src="/assets/images/mock-desktop.png" className="relative w-[90%]" alt="mock desktop" />
          <img src="/assets/images/mock-mobile.png" className="absolute bottom-0 right-0 w-[30%]" alt="mock mobile" />
        </div>
      </div>
    </main>
  )
}
