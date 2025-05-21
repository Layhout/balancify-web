import { Button } from '@/components/ui/button'
import { AppNavLink } from '../_hooks/useAppLayout'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { ROUTES } from '@/lib/constants'
import { Fragment } from 'react'
import { LuPlus } from 'react-icons/lu'

type MobileNavProps = {
  appNavLinks: AppNavLink[]
  pathname: string
}

export function MobileNav({ appNavLinks, pathname }: MobileNavProps) {
  return (
    <div className="md:hidden">
      <nav className="fixed bottom-0 left-0 right-0 block h-20">
        <Card className="relative h-full w-full rounded-b-none">
          <CardContent className="grid h-full w-full grid-cols-5 overflow-hidden p-0">
            {appNavLinks.map(({ Icon, SelectedIcon, link, title }, index) => (
              <Fragment key={title}>
                {index === 2 && (
                  <div className="flex items-center justify-center">
                    <Button size="icon" className="col-span-full">
                      <Link href={ROUTES.APP.EXPENSES_CREATE}>
                        <LuPlus className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )}
                <div className="flex flex-col items-center justify-center">
                  <Button
                    size="icon"
                    variant="ghost"
                    asChild
                    className={cn('translate-y-2 transition-all duration-300 hover:bg-background', {
                      'translate-y-0': pathname.startsWith(link),
                    })}
                  >
                    <Link href={link}>
                      <Icon className={cn('hidden h-4 w-4 flex-shrink-0', { block: !pathname.startsWith(link) })} />
                      <SelectedIcon
                        className={cn('hidden h-4 w-4 flex-shrink-0', { block: pathname.startsWith(link) })}
                      />
                    </Link>
                  </Button>
                  <span
                    className={cn('translate-y-full text-xs opacity-0 transition-all duration-300', {
                      'translate-y-0 opacity-100': pathname.startsWith(link),
                    })}
                  >
                    {title}
                  </span>
                </div>
              </Fragment>
            ))}
          </CardContent>
        </Card>
      </nav>
      <div className="h-20" />
    </div>
  )
}
