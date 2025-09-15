import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <h1 className="text-4xl">404</h1>
      <h1 className="mb-8 mt-2 text-sm">Cannot find your page.</h1>
      <Button asChild>
        <Link href={ROUTES.LANDING.HOME}>Go To Home</Link>
      </Button>
    </div>
  )
}
